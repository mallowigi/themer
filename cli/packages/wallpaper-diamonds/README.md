# @themer/wallpaper-diamonds

A wallpaper template for [themer](https://github.com/mjswensen/themer). Here's a preview rendered using the [@themer/colors-finger-paint](https://github.com/mjswensen/themer/tree/master/cli/packages/colors-finger-paint) color set:

![desktop dark](https://cdn.jsdelivr.net/gh/mjswensen/themer@8e41155aa7d906e4212df29c67e2799420e08753/cli/packages/wallpaper-diamonds/assets/themer-wallpaper-diamonds-dark-2880x1800.png)

![desktop light](https://cdn.jsdelivr.net/gh/mjswensen/themer@8e41155aa7d906e4212df29c67e2799420e08753/cli/packages/wallpaper-diamonds/assets/themer-wallpaper-diamonds-light-2880x1800.png)

## Installation & usage

Install this module wherever you have `themer` installed:

    npm install @themer/wallpaper-diamonds

Then pass `@themer/wallpaper-diamonds` as a `-t` (`--template`) arg to `themer`:

    themer -c my-colors.js -t @themer/wallpaper-diamonds -o gen

`@themer/wallpaper-diamonds` will generate PNG wallpapers to the output directory (`gen/` in this example).

The generated files will be listed in `<output dir>/README.md`.

### Default resolutions

By default, `@themer/wallpaper-diamonds` will output wallpapers at the following sizes:

* 2880 by 1800 (desktop)
* 750 by 1334 (device)

### Custom resolutions

`@themer/wallpaper-diamonds` adds the following argument to `themer`:

    --themer-wallpaper-diamonds-size

to which you would pass `<width>x<height>`. For example, to forego the default resolutions and generate two wallpapers, one 1024 by 768 and one 320 by 960:

    themer -c my-colors.js -t @themer/wallpaper-diamonds --themer-wallpaper-diamonds-size 1024x768 --themer-wallpaper-diamonds-size 320x960 -o gen
