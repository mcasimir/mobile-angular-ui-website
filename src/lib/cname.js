module.exports = function(stacktic) {
  stacktic.controller('cname', function() {
    this.route("/CNAME", { $content: "mobileangularui.com"} ).render(false);
  });
};
