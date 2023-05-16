# G2 - Changelog

## [5.0.7](https://github.com/antvis/g2/compare/5.0.6...5.0.7) (2023-05-16)

### Bug Fixes

* **animation:** update non-transform attribute and replace node without animation ([#5019](https://github.com/antvis/g2/issues/5019)) ([4adbd58](https://github.com/antvis/g2/commit/4adbd587c73bdeca7cb301afd52d7cfa874b2ed7)), closes [#4953](https://github.com/antvis/g2/issues/4953) [#5006](https://github.com/antvis/g2/issues/5006)
* **axis:** autoHide should not set crossSize ([#5032](https://github.com/antvis/g2/issues/5032)) ([86052fc](https://github.com/antvis/g2/commit/86052fced2b165b13a5dc2e0c37617a3dcd9c1f3))
* change data wont update ([#5002](https://github.com/antvis/g2/issues/5002)) ([349a9f4](https://github.com/antvis/g2/commit/349a9f4b015de11804ccc1f2847e10dc4ace24e8))
* fix issue that legend category cannot update shape ([#4968](https://github.com/antvis/g2/issues/4968)) ([152bc18](https://github.com/antvis/g2/commit/152bc18c6820e25e903ec33e12f7382fe960a0c8))
* **legend-filter:** funnel ([#4960](https://github.com/antvis/g2/issues/4960)) ([be67dfa](https://github.com/antvis/g2/commit/be67dfa176742f8cf7b9fca165f55ddfca63f3f1))
* **link:** right env var ([#5027](https://github.com/antvis/g2/issues/5027)) ([6481b00](https://github.com/antvis/g2/commit/6481b0094880a9d3cbe4f6853763013d1c1acd67))
* **point:** opacityAttribute default to colorAttribute ([#4981](https://github.com/antvis/g2/issues/4981)) ([79399d0](https://github.com/antvis/g2/commit/79399d037809e86b447ff3cb7264a262811621e5))
* **scale:** zero domain min and max ([#5014](https://github.com/antvis/g2/issues/5014)) ([2e92914](https://github.com/antvis/g2/commit/2e9291492d1542533318b70f7d937163b8a3b9f3))
* svg renderer not works in website demo ([#5000](https://github.com/antvis/g2/issues/5000)) ([b94ef47](https://github.com/antvis/g2/commit/b94ef47abb42d1b95c16ba9417256b64c1748eac))
* **tooltip:** rerender correctly ([#4962](https://github.com/antvis/g2/issues/4962)) ([f85e72f](https://github.com/antvis/g2/commit/f85e72f8e8e94d048835cafe44d7612d3ad69087))

### Features

* add thresholds params in gauge mark ([#5021](https://github.com/antvis/g2/issues/5021)) ([66a4a8e](https://github.com/antvis/g2/commit/66a4a8ecc16586c2d74155bbde479e2797f53520))
* **brush:** support resize and custom ([#5012](https://github.com/antvis/g2/issues/5012)) ([857fa7b](https://github.com/antvis/g2/commit/857fa7b2ff6d99f8509d2f99cfa949eb640109c3))
* **event:** emit plot events ([#5034](https://github.com/antvis/g2/issues/5034)) ([67576ac](https://github.com/antvis/g2/commit/67576ac91dcb94dc7fc834ff8c7f015cbe23a814))
* tooltip render to mount dom ([#5025](https://github.com/antvis/g2/issues/5025)) ([d6e098f](https://github.com/antvis/g2/commit/d6e098f022e8c3c217f5907584dda01eaadb0b34))
* **tooltip:** on and emit ([#4980](https://github.com/antvis/g2/issues/4980)) ([5f64f71](https://github.com/antvis/g2/commit/5f64f7165a14de0d66350fb7316654027b6bce7c))
* update gui and adapt to crossSize config ([#4949](https://github.com/antvis/g2/issues/4949)) ([d1d9b8d](https://github.com/antvis/g2/commit/d1d9b8d1268e7fc95bdf63c3975fce88033e2257))

## [5.0.6](https://github.com/antvis/g2/compare/5.0.5...5.0.6) (2023-05-08)

### Bug Fixes

- **chart:** chart.options changeData problem ([#4936](https://github.com/antvis/g2/issues/4936)) ([99bdec2](https://github.com/antvis/g2/commit/99bdec2062af347b8d46dfde30ab2508248b0466))
- **chart:** chart.theme as unrequired params ([#4940](https://github.com/antvis/g2/issues/4940)) ([0878230](https://github.com/antvis/g2/commit/0878230c72dd801e6e5d1d818b7bb4c7d6e547b4))
- **test:** unhandled promise rejection ([#4943](https://github.com/antvis/g2/issues/4943)) ([1ba1fcd](https://github.com/antvis/g2/commit/1ba1fcd3011b1d4618d86c4e51f6874cb6c8ff86))

### Features

- **chart:** chart bind autoFit in render ([#4941](https://github.com/antvis/g2/issues/4941)) ([c16191a](https://github.com/antvis/g2/commit/c16191a1afa7c00620c61e3315a8ba2ea1cf73fb))
- **interaction:** support focus context ([#4946](https://github.com/antvis/g2/issues/4946)) ([8dc7f1d](https://github.com/antvis/g2/commit/8dc7f1dbb48b21b10e1c2883cd72ea2f7f183971))

## [5.0.5](https://github.com/antvis/g2/compare/5.0.4...5.0.5) (2023-05-04)

### Bug Fixes

- **axis:** order of ticks for transposed x axis ([#4918](https://github.com/antvis/g2/issues/4918)) ([cf1cb88](https://github.com/antvis/g2/commit/cf1cb88483518fb30d9ad088c712dda0c3fe5b94))
- **chart:** autoFit do not set width and height of chart options ([#4922](https://github.com/antvis/g2/issues/4922)) ([f3632f5](https://github.com/antvis/g2/commit/f3632f510a4abde61b4da8e4eb77d7054cdaf7f3))
- **chart:** new Chart() do not set default view key ([#4925](https://github.com/antvis/g2/issues/4925)) ([99538a6](https://github.com/antvis/g2/commit/99538a6ff7e64f28e78b349283f5437e6c8bbb8e))
- **interaction:** transpose sliderFilter ([#4919](https://github.com/antvis/g2/issues/4919)) ([6dc8e51](https://github.com/antvis/g2/commit/6dc8e5148c8182af07896040367917efb690219f))
- **transform:** sort x only sort data in specified domain ([#4932](https://github.com/antvis/g2/issues/4932)) ([835933b](https://github.com/antvis/g2/commit/835933bb26c6db75fb2ee20186ea17ecf6214cf3))

### Features

- **interaction:** brushFilter emit filter event ([#4933](https://github.com/antvis/g2/issues/4933)) ([0e8f2d9](https://github.com/antvis/g2/commit/0e8f2d996367a2dfa2c940524547c52d84da37b7))

## [5.0.4](https://github.com/antvis/g2/compare/5.0.3...5.0.4) (2023-04-25)

### Bug Fixes

- **demo:** disable series tooltip for regression ([#4912](https://github.com/antvis/g2/issues/4912)) ([d7b74f5](https://github.com/antvis/g2/commit/d7b74f58d5445b3269f3b2434b7185f9403960e0))
- Unify params for labelFilter labelFormatter ([#4911](https://github.com/antvis/g2/issues/4911)) ([f96b2f4](https://github.com/antvis/g2/commit/f96b2f460f35e3fe2486bb366d9dddd6af1b85c7))
- **label:** support specified transform (close: [#4881](https://github.com/antvis/g2/issues/4881)) ([#4914](https://github.com/antvis/g2/issues/4914)) ([992dbce](https://github.com/antvis/g2/commit/992dbce9cb8c420f75bbbfba056617b902d0a7ea))
- **OOM:** clear interaction and cancel animation when rerendering ([#4899](https://github.com/antvis/g2/issues/4899)) ([7080def](https://github.com/antvis/g2/commit/7080defb772e001000156704dbd10fb44a168016))
- **scale:** tickCount of log scale support -1 ([#4901](https://github.com/antvis/g2/issues/4901)) ([c84aea7](https://github.com/antvis/g2/commit/c84aea7849222fff9deba57d9de97d16da9db7c1))
- **tooltip:** missing data ([#4910](https://github.com/antvis/g2/issues/4910)) ([131b032](https://github.com/antvis/g2/commit/131b0326c92b87dd1e99b04d5fba3861f90baac3))
- **tooltip:** show falsy item by default ([#4907](https://github.com/antvis/g2/issues/4907)) ([29ed50c](https://github.com/antvis/g2/commit/29ed50ce3f5c1cf599ac9f3eeb6c32acbaef7c24))
- **component** update legend component inferring strategies ([#4906](https://github.com/antvis/g2/issues/4906)) ([1816339](https://github.com/antvis/g2/commit/18163398f91c90e9eaf55cf465c7ade5f6f5f88f))

### Features

- add arrow for lineX, lineY ([#4905](https://github.com/antvis/g2/issues/4905)) ([b5d6595](https://github.com/antvis/g2/commit/b5d659525966b227bba2f1c70266985bdc336bfa))

## [5.0.3](https://github.com/antvis/g2/compare/5.0.2...5.0.3) (2023-04-12)

### Bug Fixes

- **interval:** fix interval render funnel ([#4868](https://github.com/antvis/g2/issues/4868)) ([#4875](https://github.com/antvis/g2/issues/4875)) ([0856113](https://github.com/antvis/g2/commit/08561138aa65c02e935833765321b3beb23f7a8d))
- 文档中的 sort->sortBy ([#4876](https://github.com/antvis/g2/issues/4876)) ([f2a53a9](https://github.com/antvis/g2/commit/f2a53a97e9d7cd739562ccc40a91997a17b480fd))

## [5.0.2](https://github.com/antvis/g2/compare/5.0.1...5.0.2) (2023-04-06)

### Bug Fixes

- **animation:** shape to shape animation take style.transform into account ([#4849](https://github.com/antvis/g2/issues/4849)) ([dc1eb1c](https://github.com/antvis/g2/commit/dc1eb1c68e73c891751a0d3364512dee60b0ee9a))
- **axis:** unexpected radius in polar ([#4850](https://github.com/antvis/g2/issues/4850)) ([8764d55](https://github.com/antvis/g2/commit/8764d55594b71e207e0a80844d78f83e94d765a0))
- chart render type ([#4853](https://github.com/antvis/g2/issues/4853)) ([#4861](https://github.com/antvis/g2/issues/4861)) ([12f486c](https://github.com/antvis/g2/commit/12f486c7c9edcb355ef3bd5fb8a1ba7a2e21f2e7))
- **ci:** lock version of canvas to 2.11.0 ([#4857](https://github.com/antvis/g2/issues/4857)) ([c47cbc2](https://github.com/antvis/g2/commit/c47cbc218748a1aba0828b9ff65cde97a217d563))
- **fisheye:** reset when pointerleave ([#4858](https://github.com/antvis/g2/issues/4858)) ([09ccbdb](https://github.com/antvis/g2/commit/09ccbdb467ef8787bcc6c3b8419779f3a694aaf8))
- **runtime:** wait for the next tick to finish rendering (close: [#4771](https://github.com/antvis/g2/issues/4771)) ([#4855](https://github.com/antvis/g2/issues/4855)) ([1ec5d0e](https://github.com/antvis/g2/commit/1ec5d0efebf85a05f506fedb189461244572155e))
- **tooltip:** hide tooltip when move mask ([#4860](https://github.com/antvis/g2/issues/4860)) ([bab6c3b](https://github.com/antvis/g2/commit/bab6c3bc6e6502be9ef4b8c3c3ee5b34890f6485))
- **types:** axis for composition ([#4851](https://github.com/antvis/g2/issues/4851)) ([0615ca8](https://github.com/antvis/g2/commit/0615ca8af1d30659a3919d4f5dc3b360994012b0))
- update legend marker ([#4869](https://github.com/antvis/g2/issues/4869)) ([86a7d9c](https://github.com/antvis/g2/commit/86a7d9ca24e6ca59f5ee50262d5403566db79a06))

## [5.0.1](https://github.com/antvis/g2/compare/5.0.0...5.0.1) (2023-03-29)

### Bug Fixes

- **tests:** remove .only ([#4835](https://github.com/antvis/g2/issues/4835)) ([43a4ce8](https://github.com/antvis/g2/commit/43a4ce82303eb9af9392c07ed664027b24953708))
- **tooltip:** sample ([#4832](https://github.com/antvis/g2/issues/4832)) ([46aa416](https://github.com/antvis/g2/commit/46aa41669fd95949a151b7c3d1a5a1de621f6623))
- **tooltip:** support NaN data in transpose ([#4833](https://github.com/antvis/g2/issues/4833)) ([f837057](https://github.com/antvis/g2/commit/f837057dc5d8f6dd0b60158ded7b238034459320))

### Features

- **ci:** throw error in ci env for .only and missing snapshot ([#4836](https://github.com/antvis/g2/issues/4836)) ([a49f216](https://github.com/antvis/g2/commit/a49f21684209362882c303db87eb7ab61a5fc557))

## [5.0.0](https://github.com/antvis/G2/releases/tag/5.0.0) (2023-03-21)

[Release note](https://github.com/antvis/G2/releases/tag/5.0.0).
