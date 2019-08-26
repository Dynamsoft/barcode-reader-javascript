const should = require("should");

describe("fileNameParser", () => {
  describe("with default options", () => {
    const parser = require("../lib/fileNameParser")({
      file: {
        dir: "/path/to/file",
        base: "thefile.log",
        ext: ".log",
        name: "thefile"
      }
    });
    it("should return null for filenames that do not match", () => {
      should(parser("cheese.txt")).not.be.ok();
      should(parser("thefile.log.biscuits")).not.be.ok();
    });
    it("should take a filename and return the index", () => {
      parser("thefile.log.2").should.eql({
        filename: "thefile.log.2",
        index: 2,
        isCompressed: false
      });
      parser("thefile.log.2.gz").should.eql({
        filename: "thefile.log.2.gz",
        index: 2,
        isCompressed: true
      });
    });
  });

  describe("with pattern option", () => {
    const parser = require("../lib/fileNameParser")({
      file: {
        dir: "/path/to/file",
        base: "thefile.log",
        ext: ".log",
        name: "thefile"
      },
      pattern: "yyyy-MM-dd"
    });
    it("should return null for files that do not match", () => {
      should(parser("thefile.log.biscuits")).not.be.ok();
      should(parser("thefile.log.2019")).not.be.ok();
      should(parser("thefile.log.3.2")).not.be.ok();
    });
    it("should take a filename and return the date", () => {
      parser("thefile.log.2019-07-17").should.eql({
        filename: "thefile.log.2019-07-17",
        index: 0,
        date: "2019-07-17",
        timestamp: new Date(2019, 6, 17).getTime(),
        isCompressed: false
      });
      parser("thefile.log.gz").should.eql({
        filename: "thefile.log.gz",
        index: 0,
        isCompressed: true
      });
    });
    it("should take a filename and return both date and index", () => {
      parser("thefile.log.2019-07-17.2").should.eql({
        filename: "thefile.log.2019-07-17.2",
        index: 2,
        date: "2019-07-17",
        timestamp: new Date(2019, 6, 17).getTime(),
        isCompressed: false
      });
      parser("thefile.log.2019-07-17.2.gz").should.eql({
        filename: "thefile.log.2019-07-17.2.gz",
        index: 2,
        date: "2019-07-17",
        timestamp: new Date(2019, 6, 17).getTime(),
        isCompressed: true
      });
    });
  });

  describe("with keepFileExt option", () => {
    const parser = require("../lib/fileNameParser")({
      file: {
        dir: "/path/to/file",
        base: "thefile.log",
        ext: ".log",
        name: "thefile"
      },
      keepFileExt: true
    });
    it("should take a filename and return the index", () => {
      should(parser("thefile.log.2")).not.be.ok();
      should(parser("thefile.log.2.gz")).not.be.ok();
      parser("thefile.2.log").should.eql({
        filename: "thefile.2.log",
        index: 2,
        isCompressed: false
      });
      parser("thefile.2.log.gz").should.eql({
        filename: "thefile.2.log.gz",
        index: 2,
        isCompressed: true
      });
    });
  });
});
