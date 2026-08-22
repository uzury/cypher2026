export function registerHandlebars() {
  Handlebars.registerHelper("concat", function (...args) {
    return args.slice(0, -1).join("");
  });
  Handlebars.registerHelper("eq", function (a, b) {
    return a === b;
  });
  Handlebars.registerHelper("lte", function (a, b) {
    return Number(a) <= Number(b);
  });
  Handlebars.registerHelper("gte", function (a, b) {
    return Number(a) >= Number(b);
  });
  Handlebars.registerHelper("lower", function (str) {
    return String(str || "").toLowerCase();
  });
  Handlebars.registerHelper("times", function (n, block) {
    let accum = "";
    const count = parseInt(n, 10) || 0;
    for (let i = 1; i <= count; ++i) {
      accum += block.fn(i);
    }
    return accum;
  });
  Handlebars.registerHelper("increment", function (value) {
    return Number(value || 0) + 1;
  });
}