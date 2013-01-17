JSHint.tmbundle
===============

This is node.js port of Rondevera's wonderful [JSLint Mate][jslintmate]

[jslintmate]: https://github.com/rondevera/jslintmate

### TextMate 2 ###

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
