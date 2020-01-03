function memberTitle() {
  const md = [];
  if (this.flags) {
    md.push(this.flags.map((flag) => `\`${flag}\``).join(' '));
  }
  md.push(this.name);
  return md.join(' ').trim();
}
exports.memberTitle = memberTitle;
