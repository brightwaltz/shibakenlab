/* ───────────────────────────────────────────────────────────────────────────
   ResearchMap — D3 force graph of themes / keywords / papers / projects.
   Click a theme node to scroll to that research card; hover dims the rest.
   Exposes window.__themeMapHighlight(themeId | null) so hovering a Research
   card on the page can light up the matching theme + its neighborhood.
   ─────────────────────────────────────────────────────────────────────────── */

function ResearchMap() {
  const wrap = React.useRef(null);
  const svgRef = React.useRef(null);
  const tipRef = React.useRef(null);
  const apiRef = React.useRef({});

  React.useEffect(() => {
    const data = window.LAB_GRAPH;
    const el = wrap.current;
    if (!el || !window.d3) return;
    const d3 = window.d3;

    const rect = el.getBoundingClientRect();
    let W = rect.width, H = rect.height;

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${W} ${H}`)
      .attr("preserveAspectRatio", "xMidYMid meet");
    svg.selectAll("*").remove();

    // background subtle radial gradient (in SVG)
    const defs = svg.append("defs");
    const grad = defs.append("radialGradient")
      .attr("id", "mapGlow").attr("cx", "50%").attr("cy", "50%").attr("r", "60%");
    grad.append("stop").attr("offset", "0%").attr("stop-color", "rgba(34,211,238,0.18)");
    grad.append("stop").attr("offset", "100%").attr("stop-color", "rgba(0,0,0,0)");
    svg.append("rect").attr("width", W).attr("height", H).attr("fill", "url(#mapGlow)");

    const palette = (g) =>
      g === "theme"   ? "var(--c-a2)" :
      g === "keyword" ? "var(--c-a1)" :
      g === "paper"   ? "var(--c-a3)" : "#ffffff";

    const radius = (g) => g === "theme" ? 22 : g === "keyword" ? 10 : 8;

    const linkSel = svg.append("g").attr("class", "links")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("class", "map-link");

    const nodeSel = svg.append("g").attr("class", "nodes")
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .attr("class", (d) => `map-node map-node--${d.group}`);

    nodeSel.append("circle")
      .attr("r", (d) => radius(d.group))
      .attr("fill", (d) => d.group === "theme" ? "rgba(59,130,246,0.45)" : "rgba(255,255,255,0.04)")
      .attr("stroke", (d) => palette(d.group))
      .attr("stroke-width", (d) => d.group === "theme" ? 2 : 1);

    // Labels:
    //   - Theme nodes always show their label (centered above the circle).
    //   - Keyword / paper / project labels appear only on the node's own
    //     hover, eliminating the dense label collisions in the static view.
    nodeSel.append("text")
      .attr("class", "map-node__label")
      .text((d) => d.label)
      .attr("text-anchor", (d) => d.group === "theme" ? "middle" : "start")
      .attr("x", (d) => d.group === "theme" ? 0 : radius(d.group) + 8)
      .attr("y", (d) => d.group === "theme" ? -(radius(d.group) + 10) : 4);

    const sim = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links).id((d) => d.id).distance((l) => {
        // theme<->theme: medium spacing; theme<->other: longer; others: shorter
        if (l.source.group === "theme" && l.target.group === "theme") return 200;
        if (l.source.group === "theme" || l.target.group === "theme") return 110;
        return 70;
      }))
      .force("charge", d3.forceManyBody().strength((d) => d.group === "theme" ? -700 : -160))
      .force("center", d3.forceCenter(W / 2, H / 2))
      .force("collide", d3.forceCollide((d) => radius(d.group) + (d.group === "theme" ? 36 : 22)))
      .alpha(1).alphaDecay(0.022);

    sim.on("tick", () => {
      // Clamp node positions inside the SVG so labels don't escape the wrap.
      const pad = 60;
      data.nodes.forEach((d) => {
        d.x = Math.max(pad, Math.min(W - pad, d.x));
        d.y = Math.max(pad, Math.min(H - pad, d.y));
      });
      linkSel
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
      nodeSel.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    // Drag
    const drag = d3.drag()
      .on("start", (event, d) => { if (!event.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
      .on("drag",  (event, d) => { d.fx = event.x; d.fy = event.y; })
      .on("end",   (event, d) => { if (!event.active) sim.alphaTarget(0); d.fx = null; d.fy = null; });
    nodeSel.call(drag);

    // Hover focus
    const neighbors = new Map();
    data.nodes.forEach((n) => neighbors.set(n.id, new Set([n.id])));
    data.links.forEach((l) => {
      const s = typeof l.source === "object" ? l.source.id : l.source;
      const t = typeof l.target === "object" ? l.target.id : l.target;
      neighbors.get(s).add(t); neighbors.get(t).add(s);
    });

    nodeSel.on("mouseenter", (event, d) => {
      const ns = neighbors.get(d.id);
      nodeSel.classed("is-dim", (x) => !ns.has(x.id));
      linkSel.classed("is-dim", (l) =>
        !(l.source.id === d.id || l.target.id === d.id));
      // Reveal labels of all neighbors while hovering.
      nodeSel.classed("is-focused", (x) => ns.has(x.id));
    }).on("mouseleave", () => {
      nodeSel.classed("is-dim", false);
      linkSel.classed("is-dim", false);
      nodeSel.classed("is-focused", false);
    });

    // Click any node → scroll to the corresponding research item.
    //   theme   → the matching theme card  (data-theme-id="<id>")
    //   project → the matching project card (data-project-id="<id>")
    //   keyword → the Research section header (no specific card)
    //   paper   → the Publications section (papers live there)
    // A brief .is-flash class is added to the destination card so the user
    // gets a visual cue about where they landed.
    const flash = (el) => {
      if (!el) return;
      el.classList.add("is-flash");
      window.setTimeout(() => el.classList.remove("is-flash"), 1400);
    };
    const scrollToTarget = (targetEl, opts = { block: "center" }) => {
      if (!targetEl) return;
      targetEl.scrollIntoView({ behavior: "smooth", ...opts });
      flash(targetEl);
    };

    nodeSel.on("click", (event, d) => {
      if (d.group === "theme") {
        scrollToTarget(document.querySelector(`[data-theme-id="${d.id}"]`));
      } else if (d.group === "project") {
        const card = document.querySelector(`[data-project-id="${d.id}"]`);
        // Project cards live in the Research section. Fall back to the
        // section heading when a project node has no rendered card yet
        // (e.g. KAKEN entries that aren't in LAB_PROJECTS_LIST).
        if (card) scrollToTarget(card);
        else scrollToTarget(document.getElementById("research"), { block: "start" });
      } else if (d.group === "paper") {
        scrollToTarget(document.getElementById("publications"), { block: "start" });
      } else if (d.group === "keyword") {
        scrollToTarget(document.getElementById("research"), { block: "start" });
      }
    });

    // Public API — used by Research cards to highlight the map from outside.
    const focusByThemeId = (themeId) => {
      if (!themeId) {
        nodeSel.classed("is-dim", false);
        nodeSel.classed("is-focused", false);
        nodeSel.classed("is-theme-focused", false);
        linkSel.classed("is-dim", false);
        return;
      }
      const ns = neighbors.get(themeId);
      if (!ns) return;
      nodeSel.classed("is-dim", (x) => !ns.has(x.id));
      nodeSel.classed("is-focused", (x) => ns.has(x.id));
      nodeSel.classed("is-theme-focused", (x) => x.id === themeId);
      linkSel.classed("is-dim", (l) =>
        !(l.source.id === themeId || l.target.id === themeId));
    };
    window.__themeMapHighlight = focusByThemeId;
    apiRef.current.focus = focusByThemeId;

    // Resize
    const onResize = () => {
      const r = el.getBoundingClientRect();
      W = r.width; H = r.height;
      svg.attr("viewBox", `0 0 ${W} ${H}`);
      sim.force("center", d3.forceCenter(W / 2, H / 2));
      sim.alpha(0.4).restart();
    };
    const ro = new ResizeObserver(onResize); ro.observe(el);

    return () => {
      sim.stop(); ro.disconnect();
      if (window.__themeMapHighlight === focusByThemeId) delete window.__themeMapHighlight;
    };
  }, []);

  return (
    <div className="map-wrap glass" ref={wrap}>
      <svg ref={svgRef} role="img" aria-label="Research map"></svg>
      <div className="map-legend">
        <span><i className="dot" style={{ background: "var(--c-a2)" }}></i>Theme</span>
        <span><i className="dot" style={{ background: "var(--c-a1)" }}></i>Keyword</span>
        <span><i className="dot" style={{ background: "var(--c-a3)" }}></i>Paper / Project</span>
      </div>
      <div className="map-hint" ref={tipRef} data-i18n="sections.map.hint"></div>
    </div>
  );
}

window.ResearchMap = ResearchMap;
