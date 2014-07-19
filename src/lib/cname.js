module.exports = function(stacktic) {
  stacktic.controller('cname', function(route) {
    route("/CNAME", { $content: "mobileangularui.com"} ).render(false);
  });
};
