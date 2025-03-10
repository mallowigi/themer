import prepareColors from 'themer/lib/prepare';
import themer from 'themer/lib/themer';
import JSZip from 'jszip';
import { flatten, sortBy } from 'lodash';

import * as themerAlacritty from '@themer/alacritty';
import * as themerAlfred from '@themer/alfred';
import * as themerAtomSyntax from '@themer/atom-syntax';
import * as themerAtomUi from '@themer/atom-ui';
import * as themerBbedit from '@themer/bbedit';
import * as themerBrave from '@themer/brave';
import * as themerChrome from '@themer/chrome';
import * as themerCmd from '@themer/cmd';
import * as themerConemu from '@themer/conemu';
import * as themerCss from '@themer/css';
import * as themerEmacs from '@themer/emacs';
import * as themerFirefoxAddon from '@themer/firefox-addon';
import * as themerFirefoxColor from '@themer/firefox-color';
import * as themerGnomeTerminal from 'themer-gnome-terminal';
import * as themerHyper from '@themer/hyper';
import * as themerIterm from '@themer/iterm';
import * as themerJetbrains from 'themer-jetbrains';
import * as themerKeypirinha from '@themer/keypirinha';
import * as themerKitty from '@themer/kitty';
import * as themerKonsole from '@themer/konsole';
import * as themerPrism from '@themer/prism';
import * as themerSketchPalettes from '@themer/sketch-palettes';
import * as themerSlack from '@themer/slack';
import * as themerSublimeText from '@themer/sublime-text';
import * as themerTerminator from '@themer/terminator';
import * as themerTermite from 'themer-termite';
import * as themerTmux from 'themer-tmux';
import * as themerVim from '@themer/vim';
import * as themerVimLightline from '@themer/vim-lightline';
import * as themerVisualStudio from '@themer/visual-studio';
import * as themerVscode from '@themer/vscode';
import * as themerWallpaperBlockWave from '@themer/wallpaper-block-wave';
import * as themerWallpaperBurst from '@themer/wallpaper-burst';
import * as themerWallpaperCircuits from '@themer/wallpaper-circuits';
import * as themerWallpaperDiamonds from '@themer/wallpaper-diamonds';
import * as themerWallpaperDotGrid from '@themer/wallpaper-dot-grid';
import * as themerWallpaperOctagon from '@themer/wallpaper-octagon';
import * as themerWallpaperShirts from '@themer/wallpaper-shirts';
import * as themerWallpaperTriangles from '@themer/wallpaper-triangles';
import * as themerWallpaperTrianglify from '@themer/wallpaper-trianglify';
import * as themerWindowsTerminal from '@themer/windows-terminal';
import * as themerWox from '@themer/wox';
import * as themerXcode from '@themer/xcode';
import * as themerXresources from '@themer/xresources';

const templates = {
  alacritty: { name: 'Alacritty', ...themerAlacritty },
  alfred: { name: 'Alfred', ...themerAlfred },
  atomSyntax: { name: 'Atom Syntax', ...themerAtomSyntax },
  atomUi: { name: 'Atom UI', ...themerAtomUi },
  bbedit: { name: 'BBEdit', ...themerBbedit },
  brave: { name: 'Brave', ...themerBrave },
  chrome: { name: 'Chrome', ...themerChrome },
  cmd: { name: 'CMD', ...themerCmd },
  conemu: { name: 'ConEmu', ...themerConemu },
  css: { name: 'CSS', ...themerCss },
  emacs: { name: 'Emacs', ...themerEmacs },
  firefox: [
    { name: 'Firefox Add-on', ...themerFirefoxAddon },
    { name: 'Firefox Color', ...themerFirefoxColor },
  ],
  gnomeTerminal: { name: 'GNOME Terminal', ...themerGnomeTerminal },
  hyper: { name: 'Hyper', ...themerHyper },
  iterm: { name: 'iTerm', ...themerIterm },
  jetbrains: { name: 'JetBrains', ...themerJetbrains },
  keypirinha: { name: 'Keypirinha', ...themerKeypirinha },
  kitty: { name: 'kitty', ...themerKitty },
  konsole: { name: 'Konsole', ...themerKonsole },
  prism: { name: 'prism', ...themerPrism },
  sketchPalettes: { name: 'Sketch', ...themerSketchPalettes },
  slack: { name: 'Slack sidebar', ...themerSlack },
  sublimeText: { name: 'Sublime Text', ...themerSublimeText },
  terminator: { name: 'Terminator', ...themerTerminator },
  termite: { name: 'Termite', ...themerTermite },
  tmux: { name: 'tmux', ...themerTmux },
  vim: { name: 'Vim', ...themerVim },
  vimLightline: { name: 'Vim lightline', ...themerVimLightline },
  visualStudio: { name: 'Visual Studio', ...themerVisualStudio },
  vscode: { name: 'VS Code', ...themerVscode },
  wallpaperBlockWave: { name: 'Block Wave Wallpaper', ...themerWallpaperBlockWave },
  wallpaperBurst: { name: 'Burst Wallpaper', ...themerWallpaperBurst },
  wallpaperCircuits: { name: 'Circuits Wallpaper', ...themerWallpaperCircuits },
  wallpaperDiamonds: { name: 'Diamonds Wallpaper', ...themerWallpaperDiamonds },
  wallpaperDotGrid: { name: 'Dot Grid Wallpaper', ...themerWallpaperDotGrid },
  wallpaperOctagon: { name: 'Octagon Wallpaper', ...themerWallpaperOctagon },
  wallpaperShirts: { name: 'Shirts Wallpaper', ...themerWallpaperShirts },
  wallpaperTriangles: { name: 'Triangles Wallpaper', ...themerWallpaperTriangles },
  wallpaperTrianglify: { name: 'Trianglify Wallpaper', ...themerWallpaperTrianglify },
  windowsTerminal: { name: 'Windows Terminal', ...themerWindowsTerminal },
  wox: { name: 'Wox', ...themerWox },
  xcode: { name: 'Xcode', ...themerXcode },
  xresources: { name: 'Xresources', ...themerXresources },
};

const resolutionOptions = {
  wallpaperBlockWave: 'themer-wallpaper-block-wave-size',
  wallpaperBurst: 'themer-wallpaper-burst-size',
  wallpaperCircuits: 'themer-wallpaper-circuits-size',
  wallpaperDiamonds: 'themer-wallpaper-diamonds-size',
  wallpaperDotGrid: 'themer-wallpaper-dot-grid-size',
  wallpaperOctagon: 'themer-wallpaper-octagon-size',
  wallpaperShirts: 'themer-wallpaper-shirts-size',
  wallpaperTriangles: 'themer-wallpaper-triangles-size',
  wallpaperTrianglify: 'themer-wallpaper-trianglify-size',
};

const instructions = url => `# \`themer\`

Your theme's unique URL:

${url}

If you find \`themer\` useful, here are some ways to support the project:

* Star [\`themer\` on GitHub](https://github.com/mjswensen/themer)
* Follow [@themerdev](https://twitter.com/themerdev) on Twitter
* [Send a tip through the Brave Browser](https://brave.com/the537), either on [the repository page](https://github.com/mjswensen/themer) or [the Web UI](https://themer.dev)
* Pay what you want when downloading your theme from [themer.dev](https://themer.dev)

# Installation instructions`;

const colorsForCli = (cliColors, url) => `// This file can be used with the themer CLI, see https://github.com/mjswensen/themer

module.exports.colors = ${JSON.stringify(cliColors, null, 2)};

// Your theme's URL: ${url}
`;

export default async function generateZip(selections, colors, width, height, url, cliColors) {
  const zip = new JSZip();
  const preparedColors = prepareColors(colors);
  const selectedKeys = Array.from(Object.entries(selections))
    .filter(([_, selected]) => selected)
    .map(([key]) => key);
  const selectedTemplates = sortBy(
    flatten(
      selectedKeys.map(key => Array.isArray(templates[key]) ? templates[key] : [templates[key]]),
    ),
    template => template.name.toLowerCase(),
  );
  const extraArgs = selectedKeys.reduce(
    (acc, key) => ({
      ...acc,
      [resolutionOptions[key]]: `${width}x${height}`
    }),
    {},
  );
  const files = await themer(
    preparedColors,
    selectedTemplates,
    extraArgs,
    '/',
    instructions(url),
  );
  for (const file of files) {
    zip.file(file.name, file.contents);
  }
  zip.file('colors.js', colorsForCli(cliColors, url));
  return zip;
}
