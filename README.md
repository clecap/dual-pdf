# dual-pdf
Dual PDF-viewer synchronizing two PDFs in two browser windows for coop with LaTeX beamer package

Work in progress.

## Current short demo:
1. Install node on your machine
2. Download and unzip this project
3. cd into the directory
4. node server.js
5. browser to localhost:8125/docent.html
6. The page will want to open a popup - so allow that popup (and, maybe, reload)
7. Move the opened popup window ("beamer.html") to second screen
8. Mouseclick into the first window (docent)
9. Navigate with left and right cursor keys

## Idea
The basic idea is to get a dual pdf support for the latex beamer package running which, in difference to existing state of the art
1. works in every browser
2. does not require linux, python or whatever the other solutions require
3. works also when the two windows (main and second screen) have different resolution

## Currentt status:
1. Only proof of concept with fixed pdf slides

## Forthcoming as soon as I have time (LOL)
1. beamer support files
2. more doc
3. chose your pdf file
4. integrate with browser based LaTeX build environment from one of my other projects


