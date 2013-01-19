JSHint.tmbundle
===============

This is node.js port of Rondevera's wonderful [JSLint Mate][jslintmate]. As [JSHint][jshint] is [dropping support for JSC in v1.0.0][jshint1] and requiring it to be run from node, this bundle is requiring only Node.js to run.

[jslintmate]: https://github.com/rondevera/jslintmate
[jshint]: http://www.jshint.com
[jshint1]: http://www.jshint.com/blog/2012-12-29/1-0-0-rc1/

### TextMate 2 ###

**Requirements:** 

- [Node.js][nodejs] (tested with v0.8.16)

[nodejs]: http://www.nodejs.org

**Installation:** While TextMate 2 is in development, installation is
[temporarily a bit more involved][textmate 2 bundles]:

1.  Create the bundles path: `mkdir -p ~/Library/Application\ Support/Avian/Pristine\ Copy/Bundles/`.
2.  Open the same path: `open ~/Library/Application\ Support/Avian/Pristine\ Copy/Bundles/`.
3.  Clone the repository `git clone git://github.com/oost/JSHint.tmbundle.git`.
4.  Go to the directory `cd JSHint.tmbundle`.
5.  Run `make`

**Display:** In TextMate 2, JSLintMate runs in a panel in the main window,
rather than in a separate window. To make TextMate 2 open JSLintMate in a
separate window, run this in Terminal
([source][textmate 2 htmlOutputPlacement]):

    defaults write com.macromates.TextMate.preview htmlOutputPlacement window

### Configuration ###

**Directories to Ignores**

- Create a `.jshintignores` files at the root of the project with directories to be ignored for the JSHint Project command. For examples, see the `.jshintignores` file in this project.
