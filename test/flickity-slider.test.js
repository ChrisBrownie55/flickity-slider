// tests
describe("<flickity-slider>", () => {
  // useful stuff up here
  const wait = delay => new Promise(resolve => setTimeout(resolve, delay));
  let el;

  describe("Registration", () => {
    beforeEach(() => {
      el = fixture("simple");
    });

    it("is an element", () => {
      expect(el).to.be.instanceof(
        HTMLElement,
        "el is not an instance of HTMLElement"
      );
    });

    it("has an instance of Flickity", () => {
      expect(el._flickity).to.be.instanceof(
        Flickity,
        "el._flickity is not an instance of Flickity"
      );
    });

    it("has default options", () => {
      expect(el.options).to.deep.equal(
        {
          prevNextButtons: true,
          pageDots: true
        },
        "default options are incorrect"
      );
    });

    it("has default parallax", () => {
      expect(el.parallax).to.be.equal(
        false,
        "parallax should default to false"
      );
    });

    it("has Flickity generated elements", () => {
      expect(el.children[0].className).to.be.equal("flickity-viewport");
      expect(el.children[0].children[0].className).to.be.equal(
        "flickity-slider"
      );

      expect(el.children[1].tagName).to.be.equal("BUTTON");
      expect(el.children[2].tagName).to.be.equal("BUTTON");
      expect(el.children[3].tagName).to.be.equal("OL");

      expect(el.children[1].className).to.be.equal(
        "flickity-button flickity-prev-next-button previous"
      );
      expect(el.children[2].className).to.be.equal(
        "flickity-button flickity-prev-next-button next"
      );
      expect(el.children[3].className).to.be.equal("flickity-page-dots");
    });
  });

  describe("Slotted children", () => {
    beforeEach(() => {
      el = fixture("slotted-children");
    });

    it("has correctly slotted children", () => {
      expect(el.children[0].children[0].children).to.have.lengthOf(
        4,
        "number of slotted children is not 4"
      );
    });
  });

  describe("Parallax", function() {
    beforeEach(() => {
      el = fixture("parallax");
    });
    this.timeout(3500);

    it(
      "translates elements to the right when moving right",
      mochaAsync(async () => {
        await wait(1000);
        el._flickity.resize();

        const img = el.querySelector("img");
        const parseTransformX = element =>
          parseInt(
            element.style.transform.replace(/.*?translateX\((.+?)px\).*/, "$1")
          );
        const start = parseTransformX(img);

        el._flickity.next();

        await wait(2000);
        const now = parseTransformX(img);
        expect(now).to.be.above(
          start,
          "transformX should be greater after moving to the right"
        );
      })
    );
  });
});
