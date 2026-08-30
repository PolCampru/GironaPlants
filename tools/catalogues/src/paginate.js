/* Browser-side pagination.
 *
 * The document is generated as one flat list of blocks inside #src. They are
 * measured ONCE — #src is styled to the exact width of a printed column, so a
 * single layout pass gives every block its real height — and then dealt into
 * A4 columns by arithmetic. Measuring per block forces thousands of
 * synchronous layouts and takes the renderer down on a document this size.
 *
 * Pages are assembled as HTML and written out in one go; nothing is moved
 * around the live DOM. */
(function () {
  window.layout = function layout(cfg) {
    const out = document.getElementById("out");
    const src = document.getElementById("src");
    const blocks = Array.from(src.children);

    /* ---- learn the page geometry from an empty page ---- */
    const probe = document.createElement("div");
    probe.style.cssText =
      "position:absolute;left:-10000px;top:0;visibility:hidden";
    probe.innerHTML = pageHTML(cfg, "0", '<div class="col">' + cfg.columnHead + "</div>");
    document.body.appendChild(probe);
    const limit = probe.querySelector(".cols").getBoundingClientRect().height - 3;
    const colBox = probe.querySelector(".col").getBoundingClientRect();
    const headHeight = colBox.height;
    const colWidth = colBox.width;
    probe.remove();

    /* ---- measure every block at that width, in one pass ---- */
    src.style.cssText =
      "position:absolute;left:-10000px;top:0;visibility:hidden;width:" +
      colWidth + "px";
    const tops = blocks.map((b) => b.offsetTop);
    const lastH = blocks.length
      ? blocks[blocks.length - 1].getBoundingClientRect().height
      : 0;
    const heights = blocks.map((b, i) =>
      i + 1 < blocks.length ? tops[i + 1] - tops[i] : lastH
    );

    /* ---- deal blocks into columns ---- */
    const columns = [];
    let cur = [];
    let used = headHeight;
    for (let i = 0; i < blocks.length; i++) {
      // a genus band never sits alone at the foot of a column
      const need = blocks[i].classList.contains("band")
        ? heights[i] + (heights[i + 1] || 0)
        : heights[i];
      if (used + need > limit && cur.length) {
        columns.push(cur);
        cur = [];
        used = headHeight;
      }
      cur.push(blocks[i].outerHTML);
      used += heights[i];
    }
    if (cur.length) columns.push(cur);
    src.remove();

    /* ---- write the pages ---- */
    let html = "";
    let pageNo = cfg.firstFolio;
    for (let i = 0; i < columns.length; i += 2) {
      const cols = columns
        .slice(i, i + 2)
        .map((items) => '<div class="col">' + cfg.columnHead + items.join("") + "</div>")
        .join("");
      html += pageHTML(cfg, pageNo, cols);
      pageNo++;
    }
    out.insertAdjacentHTML("beforeend", html);
    document.documentElement.dataset.lastFolio = pageNo - 1;
  };

  function pageHTML(cfg, folio, inner) {
    return (
      '<section class="page">' +
      '<header class="rh"><span class="mark">Girona Plants</span><span class="doc">' + cfg.doc + "</span></header>" +
      '<div class="cols">' + inner + "</div>" +
      '<footer class="rf"><span>' + cfg.foot + '</span><span class="folio">' + folio + "</span></footer>" +
      "</section>"
    );
  }
})();
