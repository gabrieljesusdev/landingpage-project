(function () {
  if (!window.CMS) return;

  window.CMS.registerPreviewStyle("/admin/preview.css");

  try {
    var h = window.h;
    if (typeof h === "function") {
      var SitePreview = function (props) {
        var data = props.entry.getIn(["data"]);
        var hero = data && data.getIn(["home", "hero"]);
        var services = data && data.getIn(["home", "servicesShowcase", "cards"]);
        var testimonials = data && data.getIn(["home", "testimonials", "items"]);

        var title = (hero && hero.get("title")) || "Titulo do Hero";
        var subtitle = (hero && hero.get("subtitle")) || "Subtitulo do Hero";
        var cards = services ? services.toJS() : [];
        var reviews = testimonials ? testimonials.toJS() : [];

        return h("div", { className: "site-preview" }, [
          h("section", { className: "preview-hero", key: "hero" }, [
            h("h1", { key: "title" }, title),
            h("p", { key: "subtitle" }, subtitle),
          ]),
          h(
            "section",
            { className: "preview-grid", key: "services" },
            cards.slice(0, 6).map(function (card, index) {
              return h("article", { className: "preview-card", key: "card-" + index }, [
                h("h3", { key: "title" }, card.title || "Card"),
                h("p", { key: "desc" }, card.description || "Descricao do card"),
              ]);
            })
          ),
          h(
            "div",
            { className: "preview-meta", key: "meta" },
            "Preview rapido: " + reviews.length + " avaliacao(oes)"
          ),
        ]);
      };

      window.CMS.registerPreviewTemplate("site", SitePreview);
    }
  } catch (error) {
    console.warn("Preview custom desativado:", error);
  }

  window.CMS.init();
})();
