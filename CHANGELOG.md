## [5.3.2](https://github.com/antvis/g2/compare/5.3.1...5.3.2) (2025-04-21)



## [5.3.1](https://github.com/antvis/g2/compare/5.3.0...5.3.1) (2025-04-21)


### Bug Fixes

* **docs:** fix a render error of char '|' ([#6785](https://github.com/antvis/g2/issues/6785)) ([04dade0](https://github.com/antvis/g2/commit/04dade096fe22cf338bdb859bdcf0c8edc285daa))
* **label:** the labels in the treemap are blocking click interactions ([#6765](https://github.com/antvis/g2/issues/6765)) ([f99d0af](https://github.com/antvis/g2/commit/f99d0af45e889a5f155c5e6ffb8902f5d088108f))
* tooltip pickup error when width is not equal ([#6738](https://github.com/antvis/g2/issues/6738)) ([1e73769](https://github.com/antvis/g2/commit/1e737697aa68baf4af6cb2b60f16bc2ba7d747e3))
* tooltip with one element ([#6763](https://github.com/antvis/g2/issues/6763)) ([0318b9d](https://github.com/antvis/g2/commit/0318b9de57741b34d4a3528d601319d439152eac))


### Features

* site seo optimization ([#6759](https://github.com/antvis/g2/issues/6759)) ([8605e56](https://github.com/antvis/g2/commit/8605e56bed768bdf5904a86ec2d1933cd22e20ff))
* tooltip support pointerdown, pointerup event ([#6789](https://github.com/antvis/g2/issues/6789)) ([9edb6a1](https://github.com/antvis/g2/commit/9edb6a1794cecb5c8b560394c4f61ca55b7921a7))


### Reverts

* tooltip logic to 5.2.12 ([#6776](https://github.com/antvis/g2/issues/6776)) ([e51c1ad](https://github.com/antvis/G2/commit/e51c1ad036f32704019056121e15cc4ec7376d94))



# [5.3.0](https://github.com/antvis/g2/compare/v5.2.12...v5.3.0) (2025-04-10)


### Bug Fixes

* 修改scale后line颜色不刷新 ([#6655](https://github.com/antvis/g2/issues/6655)) ([e3938f0](https://github.com/antvis/g2/commit/e3938f07bac1cb2451bf949de97ceee5494ee638))
* autofit render errror after legend filter ([#6723](https://github.com/antvis/g2/issues/6723)) ([9b7349a](https://github.com/antvis/g2/commit/9b7349a6f202fe7372a3a2c2bbf5cecec409087a))
* display abnormally when seriesTooltip ([#6708](https://github.com/antvis/g2/issues/6708)) ([f271890](https://github.com/antvis/g2/commit/f2718909d8e45abf2c5cbe29f792f82fbc43120a))
* element event error ([#6750](https://github.com/antvis/g2/issues/6750)) ([780870f](https://github.com/antvis/g2/commit/780870fec10ea12bf3a00c766fcc904583a11934))
* handle the case where stepWidth is negative ([#6758](https://github.com/antvis/g2/issues/6758)) ([7737f97](https://github.com/antvis/g2/commit/7737f97e1b887a1c3cdb673a6f044906e737abd6))
* tooltip marker blocked elements select ([#6695](https://github.com/antvis/g2/issues/6695)) ([e754054](https://github.com/antvis/g2/commit/e754054c3e299e4bf8710bb49ca33a2527eaad5c))
* **tooltip:** handle single element case in series tooltip ([#6717](https://github.com/antvis/g2/issues/6717)) ([17c5c41](https://github.com/antvis/g2/commit/17c5c410b80b2583c9dfe4ee9a06a4587bb71f5a))
* triangleDown render error ([#6697](https://github.com/antvis/g2/issues/6697)) ([5dd94a6](https://github.com/antvis/g2/commit/5dd94a6b11850dbb94eb40d5af4c4753f1338af8))
* unit test errors ([#6722](https://github.com/antvis/g2/issues/6722)) ([0b944a5](https://github.com/antvis/g2/commit/0b944a55944887db95aa11e0c55426550e6cca6b))


### Features

* add oscp issue template ([#6662](https://github.com/antvis/g2/issues/6662)) ([fa3bec1](https://github.com/antvis/g2/commit/fa3bec12f2bd6e9e7a62281040599cb2292d37e2))
* element select support custom region group ([#6724](https://github.com/antvis/g2/issues/6724)) ([84316ec](https://github.com/antvis/g2/commit/84316ecfcb6db7962e2199fe99585c4db3a443ee))
* **scrollbar:** scrollbar docs update ([#6688](https://github.com/antvis/g2/issues/6688)) ([4796258](https://github.com/antvis/g2/commit/479625869cd5ec310aa190333ed5949b70757de3))
* support expression string for function config ([#6709](https://github.com/antvis/g2/issues/6709)) ([e97f996](https://github.com/antvis/g2/commit/e97f99626d83997f86922bffc98d4fcbdf000dc7))
* update announcement for doc season ([#6696](https://github.com/antvis/g2/issues/6696)) ([a4ef7cf](https://github.com/antvis/g2/commit/a4ef7cf482087698f93f3b837dac46c4d7872ceb))
* update oscp issue template ([#6664](https://github.com/antvis/g2/issues/6664)) ([251c0a1](https://github.com/antvis/g2/commit/251c0a1f7712dd7f17780f836152f516c2eaf6b8))
* update oscp issue template ([#6691](https://github.com/antvis/g2/issues/6691)) ([0c8586f](https://github.com/antvis/g2/commit/0c8586fb55f182e1ae91b41febdfdf63c3645038))
* update oscp template ([#6713](https://github.com/antvis/g2/issues/6713)) ([44149ee](https://github.com/antvis/g2/commit/44149eeac03b4ef8a4789f51573a71f3a30ec52d))
* update oscp template ([#6715](https://github.com/antvis/g2/issues/6715)) ([1d79b49](https://github.com/antvis/g2/commit/1d79b4969c6d2597d5d56ee473783e3bc3fa29c3))



## [5.2.12](https://github.com/antvis/g2/compare/5.2.11...5.2.12) (2025-03-17)


### Bug Fixes

* **chart:** resolve issue [#6544](https://github.com/antvis/g2/issues/6544) with line chart sorting ([#6621](https://github.com/antvis/g2/issues/6621)) ([7000e20](https://github.com/antvis/g2/commit/7000e2082c690bab9c02d24add7b870e849cf299))
* eliminate empty entries in word-cloud legend items ([#6614](https://github.com/antvis/g2/issues/6614)) ([7909a21](https://github.com/antvis/g2/commit/7909a21530443ce4be3a5e5ef6cb3438bd5e749c))
* items callback's priority ([#6630](https://github.com/antvis/g2/issues/6630)) ([73daf22](https://github.com/antvis/g2/commit/73daf22d7789dabfe266aa3ef2d2e8ab260d3dd1))
* overriding style.d causes custom rendering errors ([#6603](https://github.com/antvis/g2/issues/6603)) ([cbff5f0](https://github.com/antvis/g2/commit/cbff5f04dcecb41c6507349e48816a87ea683340))


### Features

* add action to update documentations to yuque ([#6627](https://github.com/antvis/g2/issues/6627)) ([086b39e](https://github.com/antvis/g2/commit/086b39e3a675e73433ccfae3f494f660874ec8e2))
* add support for multi-select hotkeys ([#6628](https://github.com/antvis/g2/issues/6628)) ([f0c21a1](https://github.com/antvis/g2/commit/f0c21a161a34613efb1f0d27322320d5dc0a9d30))
* **docs:** update docs, image、linX、lineY、link、liquid、polygon ([#6635](https://github.com/antvis/g2/issues/6635)) ([a9c9ce9](https://github.com/antvis/g2/commit/a9c9ce949a6eaae82b8725d3361a7b69b0527d08))



## [5.2.11](https://github.com/antvis/g2/compare/5.2.10...5.2.11) (2025-02-11)


### Bug Fixes

*  g版本升级，supportsCSSTransform=true是默认设置 ([#6567](https://github.com/antvis/g2/issues/6567)) ([21efda5](https://github.com/antvis/g2/commit/21efda5572d207d9a9309417ace1acaee2ff2ead))
* heatmap render error ([#6557](https://github.com/antvis/g2/issues/6557)) ([b9ca90b](https://github.com/antvis/g2/commit/b9ca90baa8a25d58bb1c25edd6f594ce44839b41))
* overflowHide error in some case ([#6597](https://github.com/antvis/g2/issues/6597)) ([d67f6df](https://github.com/antvis/g2/commit/d67f6df64cc8a46ddcb01612951c8ed43aa1d50f))


### Features

* add helix coordinate and related examples/tests ([#6545](https://github.com/antvis/g2/issues/6545)) ([48dcd69](https://github.com/antvis/g2/commit/48dcd69b0dd832b69ea8907b5cc1b850a1fcf148))
* add petercat ([#6579](https://github.com/antvis/g2/issues/6579)) ([8a310b7](https://github.com/antvis/g2/commit/8a310b71338712679cff192a1b955130a1460790)), closes [#6587](https://github.com/antvis/g2/issues/6587)
* use @antv/vendor to replace d3 package ([#6594](https://github.com/antvis/g2/issues/6594)) ([dac27dd](https://github.com/antvis/g2/commit/dac27dd3c6cb5f4cd081322d417c9685921aa4b3))



## [5.2.10](https://github.com/antvis/g2/compare/5.2.9...5.2.10) (2024-12-10)


### Bug Fixes

* site dev error & lodash ghost dependency ([#6543](https://github.com/antvis/g2/issues/6543)) ([71fd89d](https://github.com/antvis/g2/commit/71fd89dc4325ea81035cec656654b3c1932b8296))


### Features

* add tooltip data to tooltip event callback ([#6529](https://github.com/antvis/g2/issues/6529)) ([c04318f](https://github.com/antvis/g2/commit/c04318f6e4f2ea1064305ac44618b2087e297788))



## [5.2.9](https://github.com/antvis/g2/compare/5.2.8...5.2.9) (2024-12-06)


### Bug Fixes

* **label:** correct label selector parameter handling and test case ([#6532](https://github.com/antvis/g2/issues/6532)) ([f8ce4ee](https://github.com/antvis/g2/commit/f8ce4ee574069fe1d36cd0b3cccb152a515af127))
* remove unnecessary structure and update label attributes ([#6538](https://github.com/antvis/g2/issues/6538)) ([9d66375](https://github.com/antvis/g2/commit/9d66375cc42f99c2b35257f77d33938ee0cfaab8))


### Features

* **gauge:** add custom text tooltip support for gauge chart ([#6533](https://github.com/antvis/g2/issues/6533)) ([9e57dfe](https://github.com/antvis/g2/commit/9e57dfe520e98e6d3434df19184e0de02e683297))
* **label:** implement label color inheritance from dependent elements ([#6536](https://github.com/antvis/g2/issues/6536)) ([56c0a3e](https://github.com/antvis/g2/commit/56c0a3ed9b3d5a7cfa17da04bb0851d3e4027c1b))
* **transform:** add exponential smoothing data transform methods ([#6522](https://github.com/antvis/g2/issues/6522)) ([0ec584c](https://github.com/antvis/g2/commit/0ec584cd01332c6431147f759d2163d37831afc9))



## [5.2.8](https://github.com/antvis/g2/compare/5.2.6...5.2.8) (2024-10-18)


### Bug Fixes

*  prevent label overlap in multiple charts ([#6490](https://github.com/antvis/g2/issues/6490)) ([6013d72](https://github.com/antvis/g2/commit/6013d72881276aca9d17d93908d33b21194979c6))
* tooptip position offset in dodgeX ([#6483](https://github.com/antvis/g2/issues/6483)) ([df4920f](https://github.com/antvis/g2/commit/df4920f7305966b00a3ae252b11f7f7df94136d1))



## [5.2.7](https://github.com/antvis/g2/compare/5.2.6...5.2.7) (2024-10-08)


### Bug Fixes

* tooptip position offset in dodgeX ([#6483](https://github.com/antvis/g2/issues/6483)) ([df4920f](https://github.com/antvis/g2/commit/df4920f7305966b00a3ae252b11f7f7df94136d1))



## [5.2.6](https://github.com/antvis/g2/compare/5.2.5...5.2.6) (2024-09-30)


### Bug Fixes

* update the  position of lineXY with arrow ([#6442](https://github.com/antvis/g2/issues/6442)) ([3d426cc](https://github.com/antvis/g2/commit/3d426cc8a8937b94e21b8e92d72a9ae2e2a77b89))
* when update the position of tooltip, calculate the containerOffset ([#6469](https://github.com/antvis/g2/issues/6469)) ([ed5a1d6](https://github.com/antvis/g2/commit/ed5a1d6b9148b78c86bdbeaa4d36ce0ecab09c53))
* 订正slider组件属性文件 ([#6467](https://github.com/antvis/g2/issues/6467)) ([5c5f97a](https://github.com/antvis/g2/commit/5c5f97a6fc7c3f3407d67024bf49934d42ac4d28))


### Features

* add columnWidthRatio configuration to the style of the interval ([#6474](https://github.com/antvis/g2/issues/6474)) ([ff5bbc0](https://github.com/antvis/g2/commit/ff5bbc0f660efb9af870fcc0d5581639606e887f))



## [5.2.5](https://github.com/antvis/g2/compare/5.2.4...5.2.5) (2024-08-30)


### Bug Fixes

* sankey tooltip interaction when type is view ([#6417](https://github.com/antvis/g2/issues/6417)) ([8e3538c](https://github.com/antvis/g2/commit/8e3538ca65908112c60588097bfc1d811bbee468))
* the mouse position is offset of dodgeX tooltip event ([#6418](https://github.com/antvis/g2/issues/6418)) ([f003001](https://github.com/antvis/g2/commit/f003001b475367d2a3bfe8610eee78b2fc2b1db2))



## [5.2.4](https://github.com/antvis/g2/compare/5.2.3...5.2.4) (2024-08-26)


### Bug Fixes

* legend filter text ([#6413](https://github.com/antvis/g2/issues/6413)) ([4def026](https://github.com/antvis/g2/commit/4def026ea83fddeded4b592f711442f6dff3e970))
* tooltip interaction in api mode ([#6411](https://github.com/antvis/g2/issues/6411)) ([decb91f](https://github.com/antvis/g2/commit/decb91f117ca64445f71ec6b91e79d1388b2e0a8))



## [5.2.3](https://github.com/antvis/g2/compare/5.2.2...5.2.3) (2024-08-12)


### Bug Fixes

* **tooltip:** replaceChildren compatible with lower versions ([#321](https://github.com/antvis/component/pull/321))


### Features

* export registerSymbol ([#6381](https://github.com/antvis/g2/issues/6381)) ([38b6711](https://github.com/antvis/g2/commit/38b6711619ef741be2604b41f0526867d38cb80d))



## [5.2.2](https://github.com/antvis/g2/compare/5.2.1...5.2.2) (2024-07-25)


### Bug Fixes

* **deploy:** use npm@20 to fix error ([#6356](https://github.com/antvis/g2/issues/6356)) ([bf13fe8](https://github.com/antvis/g2/commit/bf13fe8a3d8006393b9e89843e050ea2fcb5b7eb))
* **facet:** legend color do not match pie color ([#6369](https://github.com/antvis/g2/issues/6369)) ([eadad96](https://github.com/antvis/g2/commit/eadad96ede90e8032aef66f10434856b8c11cbdb))
* liquid data is not in object form antvis [#6145](https://github.com/antvis/g2/issues/6145) ([#6379](https://github.com/antvis/g2/issues/6379)) ([1aabab7](https://github.com/antvis/g2/commit/1aabab7da9df2b9609529e3eaca5d24b18bf7c17)), closes [#5900](https://github.com/antvis/g2/issues/5900) [#6276](https://github.com/antvis/g2/issues/6276)
* **slider:** wrong position for labels ([#6378](https://github.com/antvis/g2/issues/6378)) ([633b291](https://github.com/antvis/g2/commit/633b291a563e3a61e534b225378af2a5d1a6f464))
* **spider:** work with exceedAdjust ([#6365](https://github.com/antvis/g2/issues/6365)) ([14283dd](https://github.com/antvis/g2/commit/14283dd4debf3e4af8dffe8e9f2e93a618db15f4))


### Features

* **filter:** add no selected elements display for itme-filter ([#6374](https://github.com/antvis/g2/issues/6374)) ([27dfc5e](https://github.com/antvis/g2/commit/27dfc5e62bee9fd1c7ce7fa641af52431c620175))
* **pie:** optimize spider ([#6357](https://github.com/antvis/g2/issues/6357)) ([d07be48](https://github.com/antvis/g2/commit/d07be486b2357713ab1b22ea2d3f8c109b05dee7))
* **scale:** add groupTransform for scales to support sync dual axes ([#6380](https://github.com/antvis/g2/issues/6380)) ([af17247](https://github.com/antvis/g2/commit/af1724713925aea6162dfab2c43c79e29ea29033))
* **tooltip:** custom marker tooltip ([#6384](https://github.com/antvis/g2/issues/6384)) ([1d43dd4](https://github.com/antvis/g2/commit/1d43dd481342ea0cd5d2adf4348f63fdb60bd6ea))



## [5.2.1](https://github.com/antvis/g2/compare/5.2.0...5.2.1) (2024-07-11)


### Bug Fixes

* **dodgeX:** do not update series channel if groupBy is invalid ([#6344](https://github.com/antvis/g2/issues/6344)) ([87c39da](https://github.com/antvis/g2/commit/87c39dae8ec04edc6e17940acfeacd1ba1549a1b))
* **legend-filter:** filter facet pie ([#6346](https://github.com/antvis/g2/issues/6346)) ([b7bb946](https://github.com/antvis/g2/commit/b7bb946e40cb9c117eafbdb86f9912d43d94e3e9))


### Features

* **wordcloud:** accept custom canvas ([#6354](https://github.com/antvis/g2/issues/6354)) ([759ee3f](https://github.com/antvis/g2/commit/759ee3f7cd427152a115f969a5651903eaef5f8a))



# [5.2.0](https://github.com/antvis/g2/compare/5.1.23...5.2.0) (2024-06-28)


### Bug Fixes

* **slider:** update show sparkline condition and fix test ([#6317](https://github.com/antvis/g2/issues/6317)) ([1589404](https://github.com/antvis/g2/commit/15894048ee4ef8dd32a9d646404fe66cd9f602b1))
* **tooltip:** group tooltip ([#6323](https://github.com/antvis/g2/issues/6323)) ([c2e7023](https://github.com/antvis/g2/commit/c2e7023d96678b806e736b2a8e9f76169a1b41d0))


### Features

* **tooltip:** click to show line tooltip ([#6330](https://github.com/antvis/g2/issues/6330)) ([08c66db](https://github.com/antvis/g2/commit/08c66db2fc7b2d3749896c00345dee601fbcfe5d))



## [5.1.23](https://github.com/antvis/g2/compare/5.1.22...5.1.23) (2024-06-24)


### Bug Fixes

* **tooltip:** dual axes with mult-series bar ([#6295](https://github.com/antvis/g2/issues/6295)) ([a5db4cc](https://github.com/antvis/g2/commit/a5db4cc4593b7e5fc5e5ec09168d181d7af6c1a2))
* **tooltip:** emit show in large dataset ([#6310](https://github.com/antvis/g2/issues/6310)) ([1542db5](https://github.com/antvis/g2/commit/1542db53a74ce7539611c4b9f84ab876f4d77d52))
* **tooltip:** font-family default to sans-serif ([#6314](https://github.com/antvis/g2/issues/6314)) ([20f4d71](https://github.com/antvis/g2/commit/20f4d716660115041ae0a86ab1b18bb32fb36846))
* **tooltip:** series enterable ([#6296](https://github.com/antvis/g2/issues/6296)) ([d4c9a28](https://github.com/antvis/g2/commit/d4c9a28f161d6bf2efb49282fa9925d9c1914561))
* **tooltip:** show error data if dataset if large ([#6307](https://github.com/antvis/g2/issues/6307)) ([1571ad4](https://github.com/antvis/g2/commit/1571ad477494cdc43a981d73cd43f6f83f4fefcf))


### Features

* add tooltip markerType ([#6292](https://github.com/antvis/g2/issues/6292)) ([2dd53ee](https://github.com/antvis/g2/commit/2dd53ee8ff5254caea673b8e4437e79c551d9d0e))



## [5.1.22](https://github.com/antvis/g2/compare/5.1.21...5.1.22) (2024-06-17)


### Bug Fixes

* **tooltip:** items for transposed interval + line ([#6286](https://github.com/antvis/g2/issues/6286)) ([65e09b0](https://github.com/antvis/g2/commit/65e09b0f1f69cdf76a6a88ba37c1cbd3a62d420b))


### Features

* **tooltip:** show tooltip for small interval ([#6289](https://github.com/antvis/g2/issues/6289)) ([e9ac6e0](https://github.com/antvis/g2/commit/e9ac6e0b97f083d4c3687b0a7d53e1f1e428327e))



## [5.1.21](https://github.com/antvis/g2/compare/5.1.19...5.1.21) (2024-06-04)


### Bug Fixes

* arrow with lineWidth ([#6225](https://github.com/antvis/g2/issues/6225)) ([afd3b77](https://github.com/antvis/g2/commit/afd3b77db9b8b3adeb8c035ca9d22ce3a9292b7c))
* hide axisZ when axis disabled ([#6246](https://github.com/antvis/g2/issues/6246)) ([b11be1f](https://github.com/antvis/g2/commit/b11be1f7f9a833cd6a993fa93750b2a596521e02))
* label rotate ([#6261](https://github.com/antvis/g2/issues/6261)) ([45227fa](https://github.com/antvis/g2/commit/45227fa3f5c93af105b49d6174e21fb7547c9193))
* **label:** display error ([#6172](https://github.com/antvis/g2/issues/6172)) ([51d1c51](https://github.com/antvis/g2/commit/51d1c51edb95e926a60808cc201e46e2bb785b41))
* skip animation if fromPath equals toPath ([#6193](https://github.com/antvis/g2/issues/6193)) ([fee3397](https://github.com/antvis/g2/commit/fee3397880167d3f1730d7fa14803d92181c3b58))
* **theme:** change the dark theme default background color to transparent ([#6226](https://github.com/antvis/g2/issues/6226)) ([f444a74](https://github.com/antvis/g2/commit/f444a7496f7849daa7d49b23ffeb50d8aebfc6e8))
* update docs words ([#6211](https://github.com/antvis/g2/issues/6211)) ([8ecb185](https://github.com/antvis/g2/commit/8ecb1854b884723d0dc862573e440daabc8e7a91))


### Features

* add channels to style and label callback ([#6250](https://github.com/antvis/g2/issues/6250)) ([3c003d0](https://github.com/antvis/g2/commit/3c003d08417d88eecd4995783c721a633ce19d8e))
* add context for customize label transform ([#6222](https://github.com/antvis/g2/issues/6222)) ([acc0fc0](https://github.com/antvis/g2/commit/acc0fc0ce36bd5ed63aa793568ce55590b619882))
* **interaction.tooltip:** add crosshairs, crosshairsX, crosshairsY setting ([#6229](https://github.com/antvis/g2/issues/6229)) ([0f7dc62](https://github.com/antvis/g2/commit/0f7dc62a6dd971d1c6abae9f6eaa50822107bc83))
* **label:** add label transform feature exceedAdjust ([#6209](https://github.com/antvis/g2/issues/6209)) ([fefd4ea](https://github.com/antvis/g2/commit/fefd4ea46b0cb8232730179b13cab8064560d224))



## [5.1.20](https://github.com/antvis/g2/compare/5.1.19...5.1.20) (2024-05-08)


### Bug Fixes

* **label:** display error ([#6172](https://github.com/antvis/g2/issues/6172)) ([51d1c51](https://github.com/antvis/g2/commit/51d1c51edb95e926a60808cc201e46e2bb785b41))
* skip animation if fromPath equals toPath ([#6193](https://github.com/antvis/g2/issues/6193)) ([fee3397](https://github.com/antvis/g2/commit/fee3397880167d3f1730d7fa14803d92181c3b58))
* update docs words ([#6211](https://github.com/antvis/g2/issues/6211)) ([8ecb185](https://github.com/antvis/g2/commit/8ecb1854b884723d0dc862573e440daabc8e7a91))


### Features

* add context for customize label transform ([#6222](https://github.com/antvis/g2/issues/6222)) ([acc0fc0](https://github.com/antvis/g2/commit/acc0fc0ce36bd5ed63aa793568ce55590b619882))
* **label:** add label transform feature exceedAdjust ([#6209](https://github.com/antvis/g2/issues/6209)) ([fefd4ea](https://github.com/antvis/g2/commit/fefd4ea46b0cb8232730179b13cab8064560d224))



## [5.1.19](https://github.com/antvis/g2/compare/5.1.17...5.1.19) (2024-04-19)


### Features

* refactor word cloud mark ([#6180](https://github.com/antvis/g2/issues/6180)) ([4982b46](https://github.com/antvis/G2/commit/4982b46720dcfc5fe3eba7c78dc6b7ddfb48e2fa))



## [5.1.18](https://github.com/antvis/g2/compare/5.1.17...5.1.18) (2024-04-08)


### Features

* update to g@6.0 for better performance ([#6149](https://github.com/antvis/g2/issues/6149)) ([72012e8](https://github.com/antvis/g2/commit/72012e8713afbd898322887d404d4b61d2b1d423))



## [5.1.17](https://github.com/antvis/g2/compare/5.1.16...5.1.17) (2024-03-21)


### Bug Fixes

* **pointmove:** 修复 pointmove 事件的两个问题 ([#6136](https://github.com/antvis/g2/issues/6136)) ([3dfb9e7](https://github.com/antvis/g2/commit/3dfb9e7adc071703be2c04221902f065f6a74554))
* tooltip for custom element ([#6140](https://github.com/antvis/g2/issues/6140)) ([72d8900](https://github.com/antvis/g2/commit/72d8900b59cb0b6e1016fdf2c8ab2cd2e5fe767c))
* tooltip for multi view ([#6142](https://github.com/antvis/g2/issues/6142)) ([411e1f4](https://github.com/antvis/g2/commit/411e1f49ad6829728b63400058d4796eb4ab33b6))


### Features

* **interaction:** add elementpointmove interaction ([#6110](https://github.com/antvis/g2/issues/6110)) ([e36ce30](https://github.com/antvis/g2/commit/e36ce302ceaff101a37519c9d587ab59cf428cab))



## [5.1.16](https://github.com/antvis/g2/compare/5.1.15...5.1.16) (2024-03-14)


### Bug Fixes

* **ci:** add update coverall action ([#6072](https://github.com/antvis/g2/issues/6072)) ([ffac8f8](https://github.com/antvis/g2/commit/ffac8f8d39e671f8097601ce5c81ad02ae3e2df7))
* **docs:** add axis missing property  `labelOpacity` ([#6059](https://github.com/antvis/g2/issues/6059)) ([9e35333](https://github.com/antvis/g2/commit/9e3533307e8923eaa6d7f2959ccce4595c684b32))
* quantile scale  domain calculate ([#6126](https://github.com/antvis/g2/issues/6126)) ([e8192d2](https://github.com/antvis/g2/commit/e8192d234a9396f08d45781350d20e89aba5c6be))
* scale options rangeMax and rangeMax ([#6125](https://github.com/antvis/g2/issues/6125)) ([f11e9f9](https://github.com/antvis/g2/commit/f11e9f909d6500c6995b36493f4cfa958668c67b))


### Features

* add interactive column ([#6083](https://github.com/antvis/g2/issues/6083)) ([f8a3a8d](https://github.com/antvis/g2/commit/f8a3a8d7ca8bf509f6cb69ddda58abbe2b740148))
* **shape:** add gauge shape round ([#6069](https://github.com/antvis/g2/issues/6069)) ([e0cefbb](https://github.com/antvis/g2/commit/e0cefbb5f1d4904092fc27e2e6e7b46cbd443ec0))
* **vite:** update vite configuration ([#6102](https://github.com/antvis/g2/issues/6102)) ([042c638](https://github.com/antvis/g2/commit/042c63883c46b943e81077ec77c0cd1bb08c4d8a))



## [5.1.15](https://github.com/antvis/g2/compare/5.1.14...5.1.15) (2024-01-16)


### Bug Fixes

* **api:** auotFit sizeOf width > auto width > default width ([#6013](https://github.com/antvis/g2/issues/6013)) ([0f992d2](https://github.com/antvis/g2/commit/0f992d2abb3eb7752aa0f146ba2a654d12667b73))
* **api:** scrollbar value  、silder values ([#6033](https://github.com/antvis/g2/issues/6033)) ([cded9ed](https://github.com/antvis/g2/commit/cded9ed5a5116e460085f0bbb82aa6a5051aa1ff))
* fix point scale generates gradient color ([#5977](https://github.com/antvis/g2/issues/5977)) ([039716f](https://github.com/antvis/g2/commit/039716f73b3e96138d5cdaec52f4d500268d9ab5))
* **slider:** adjust tooltip's position when clipped ([#6042](https://github.com/antvis/g2/issues/6042)) ([c6a5ee4](https://github.com/antvis/g2/commit/c6a5ee43dc45b6c437acdbec23fd232ea58a56f4))


### Features

* treemap drilldown 1.0.0 ([#6038](https://github.com/antvis/g2/issues/6038)) ([935df1b](https://github.com/antvis/g2/commit/935df1bde641a57ce30da33848268e064a5a1255))



## [5.1.14](https://github.com/antvis/g2/compare/5.1.13...5.1.14) (2024-01-05)


### Bug Fixes

* **composition:** fix composition lost chart value options ([#5995](https://github.com/antvis/g2/issues/5995)) ([7792a37](https://github.com/antvis/g2/commit/7792a37225553da33fb9f04ff77ee2fbbc18e325))
* wrong angles in polar coordinate ([#6010](https://github.com/antvis/g2/issues/6010)) ([ed5e780](https://github.com/antvis/g2/commit/ed5e7807242b3b6d7f56fccab3cfbb68824784fd))


### Features

* **event:** label click event ([#6012](https://github.com/antvis/g2/issues/6012)) ([fb0911c](https://github.com/antvis/g2/commit/fb0911c282e15c6a694628fc21d22b4d1985cd84))
* 添加方形雷达图 ([#5985](https://github.com/antvis/g2/issues/5985)) ([ae4ab58](https://github.com/antvis/g2/commit/ae4ab583f25d356a0339612da7da8e8222021faf))



## [5.1.13](https://github.com/antvis/g2/compare/5.1.12...5.1.13) (2023-12-21)


### Bug Fixes

* **axis:** custom axis tags disappear when the page is zoomed ([#5940](https://github.com/antvis/g2/issues/5940)) ([aa09cc0](https://github.com/antvis/g2/commit/aa09cc02a5e499781affd292191c11c866216690))
* **legend:** expected layout cased by large legend ([#5945](https://github.com/antvis/g2/issues/5945)) ([e4ac450](https://github.com/antvis/g2/commit/e4ac45001ddc1afb57881b1279321cfc50c54bd5))
* **mark:** change liquid text name ([#5927](https://github.com/antvis/g2/issues/5927)) ([9574d62](https://github.com/antvis/g2/commit/9574d62529e39c722dd8da927b277305a7b64cef))
* **series:** interval background ([#5965](https://github.com/antvis/g2/issues/5965)) ([8f4936e](https://github.com/antvis/g2/commit/8f4936e3bbe09a79f793a071f141ecd93f394d2d))


### Features

* **transform:** add pack padding and direction ([#5964](https://github.com/antvis/g2/issues/5964)) ([082606c](https://github.com/antvis/g2/commit/082606ce3c7af78f97afe75bfed8466d8e72808a))



## [5.1.12](https://github.com/antvis/g2/compare/5.1.11...5.1.12) (2023-12-12)


### Bug Fixes

* fix tooltip shown on one element line chart. ([#5917](https://github.com/antvis/g2/issues/5917)) ([52417d3](https://github.com/antvis/g2/commit/52417d301dc28f37100b2b48dd1b94039f5b29b5))
* tooltip enterable ([#5626](https://github.com/antvis/g2/issues/5626)) ([08153e6](https://github.com/antvis/g2/commit/08153e6a464062ed829617bd83539408582b35d9))
* tz in cross-env ([#5915](https://github.com/antvis/g2/issues/5915)) ([8fbfa4e](https://github.com/antvis/g2/commit/8fbfa4edfe0a9bb403b8ae20af7f4dcccd31d678))


### Features

* **rangeX and rangeY:** add syntactic sugar for data ([#5914](https://github.com/antvis/g2/issues/5914)) ([1a28b3d](https://github.com/antvis/g2/commit/1a28b3d8182b75a25cccf12a6d2a1f9ff8096f6d))



## [5.1.11](https://github.com/antvis/g2/compare/5.1.10...5.1.11) (2023-12-06)


### Bug Fixes

* area and line shares the same curve generator([#5877](https://github.com/antvis/g2/issues/5877)) ([b212242](https://github.com/antvis/g2/commit/b21224269a8e35f7bf09377fa1e3d5d801073af1))
* cannot find document if group destroyed ([#5870](https://github.com/antvis/g2/issues/5870)) ([c78da52](https://github.com/antvis/g2/commit/c78da5284ec2931ff80f422d691c8d61386ef3f6))
* ci and bench ([#5880](https://github.com/antvis/g2/issues/5880)) ([046ea5f](https://github.com/antvis/g2/commit/046ea5fd230d87aacdb4ca26695f076a295ac77f))
* fix the scaleInY animation(scale in the radial direction) on the polar coordinate ([#5866](https://github.com/antvis/g2/issues/5866)) ([5422bbb](https://github.com/antvis/g2/commit/5422bbb6738d1936974f5b24d26ab4bd1ed5419a))
* tooltip should account for container in string format ([#5856](https://github.com/antvis/g2/issues/5856)) ([d923eb9](https://github.com/antvis/g2/commit/d923eb94933a053c47d7a6690b66725349a47ae9))
* **tooltip:** wrong container ([#5890](https://github.com/antvis/g2/issues/5890)) ([9ed535a](https://github.com/antvis/g2/commit/9ed535aa7af55022e1743ae929984be11af4b177))


### Features

* add jitterY ([#5887](https://github.com/antvis/g2/issues/5887)) ([fdc2172](https://github.com/antvis/g2/commit/fdc2172635ef1c2aaf12755fc627d7ae784dfa6b))
* **interaction:** define inline interaction ([#5857](https://github.com/antvis/g2/issues/5857)) ([7fc6523](https://github.com/antvis/g2/commit/7fc6523f5747881594ad2a861642cb6a1828c311))
* **slider:** support sparkline ([#5832](https://github.com/antvis/g2/issues/5832)) ([ab1f0b6](https://github.com/antvis/g2/commit/ab1f0b664346b3d2287c2b87c127f6c08812c387))
* **sunburst:** add sunburst demo ([#5854](https://github.com/antvis/g2/issues/5854)) ([22575e5](https://github.com/antvis/g2/commit/22575e571e3cd1936383e2437a9b19ded010dad9))



## [5.1.10](https://github.com/antvis/g2/compare/5.1.9...5.1.10) (2023-11-28)

### Bug Fixes

- english title of site ([#5840](https://github.com/antvis/g2/issues/5840)) ([3d8a779](https://github.com/antvis/g2/commit/3d8a7794914594a639f8e0716081f561c493b950))
- fix subLayoutFacetCircle cal center y problem ([#5833](https://github.com/antvis/g2/issues/5833)) ([74ce08a](https://github.com/antvis/g2/commit/74ce08a77b2ef55941fe8df6d8b3d524e3abef13))
- fix the rendering issue caused by `nodePaddingRatio` in chord nodes using a hack method ([#5824](https://github.com/antvis/g2/issues/5824)) ([b0b37af](https://github.com/antvis/g2/commit/b0b37af285904e3379e0943575626f0091519873))
- **interaction:** reaapply some interactions when update ([#5845](https://github.com/antvis/g2/issues/5845)) ([54f4098](https://github.com/antvis/g2/commit/54f409874aa47bb5474fcfb4898e8089392c5736))
- **tooltip:** handle undefined ([#5852](https://github.com/antvis/g2/issues/5852)) ([3f3dda5](https://github.com/antvis/g2/commit/3f3dda51768a6f2f883edf7f28c0d3f78f94c7f0))

## [5.1.9](https://github.com/antvis/g2/compare/5.1.8...5.1.9) (2023-11-22)

### Bug Fixes

- **docs:** intro of g2 ([#5797](https://github.com/antvis/g2/issues/5797)) ([838e368](https://github.com/antvis/g2/commit/838e368d8e2896e8326a5d78cb3e392134cf29c5))
- dumi-theme-antv footerTheme light ([#5813](https://github.com/antvis/g2/issues/5813)) ([2f9c729](https://github.com/antvis/g2/commit/2f9c7298505684628d9fc844359935ea79dc29b3))
- fix the transpose color gradient render ([#5809](https://github.com/antvis/g2/issues/5809)) ([291f0af](https://github.com/antvis/g2/commit/291f0afd6a684a8b1bcecb818bab6637d8f25fe4))
- **scale:** group scale by name and index ([#5815](https://github.com/antvis/g2/issues/5815)) ([2808b74](https://github.com/antvis/g2/commit/2808b7488a92fbe9d8b006dea29feec163924fa5))
- **tooltip:** overflow ([#5802](https://github.com/antvis/g2/issues/5802)) ([44188f7](https://github.com/antvis/g2/commit/44188f7f70012fc37f66e7b4f5324521b455cf8b))

### Features

- **mark:** add chord mark ([#5810](https://github.com/antvis/g2/issues/5810)) ([42fdab2](https://github.com/antvis/g2/commit/42fdab25e29e077145b91addd0bb3ad1f7e2dab8))

## [5.1.8](https://github.com/antvis/g2/compare/5.1.7...5.1.8) (2023-11-14)

### Bug Fixes

- export more types so that extensions like 3d can use them ([#5790](https://github.com/antvis/g2/issues/5790)) ([e21f39e](https://github.com/antvis/g2/commit/e21f39e15e6afbee31a6e8bd45bcc9c03166298e))
- **interaction:** legendFilter ignore undefined [#5506](https://github.com/antvis/g2/issues/5506) ([#5774](https://github.com/antvis/g2/issues/5774)) ([a0c1a44](https://github.com/antvis/g2/commit/a0c1a44dce4345cdaa6183332188fe950a8e1e02))
- **liquid:** fix liquid precision ([#5788](https://github.com/antvis/g2/issues/5788)) ([07196d1](https://github.com/antvis/g2/commit/07196d1874766419cc9ee14bf3bd8bd2d3378328))
- **mark:** delete ava type ([#5782](https://github.com/antvis/g2/issues/5782)) ([dc4a511](https://github.com/antvis/g2/commit/dc4a5118d662b3a1109b8f889879f4b30395d21d))
- render error when signle data in point mark ([#5785](https://github.com/antvis/g2/issues/5785)) ([0992faa](https://github.com/antvis/g2/commit/0992faa77763674669b3d068f6e9e1257e736f7d))
- specify TZ=Asia/Shanghai ([#5776](https://github.com/antvis/g2/issues/5776)) ([e6ab2fe](https://github.com/antvis/g2/commit/e6ab2fe2331245d4f164a98ff19dbbaca2a268ef))

### Features

- add default format to tooltip title [#5684](https://github.com/antvis/g2/issues/5684) ([#5748](https://github.com/antvis/g2/issues/5748)) ([b7e9055](https://github.com/antvis/g2/commit/b7e90556d552f66bc0d787cff168032c283bc11e))

## [5.1.8-beta.1](https://github.com/antvis/g2/compare/5.1.7...5.1.8-beta.1) (2023-11-14)

### Bug Fixes

- export more types so that extensions like 3d can use them ([#5790](https://github.com/antvis/g2/issues/5790)) ([e21f39e](https://github.com/antvis/g2/commit/e21f39e15e6afbee31a6e8bd45bcc9c03166298e))
- **interaction:** legendFilter ignore undefined [#5506](https://github.com/antvis/g2/issues/5506) ([#5774](https://github.com/antvis/g2/issues/5774)) ([a0c1a44](https://github.com/antvis/g2/commit/a0c1a44dce4345cdaa6183332188fe950a8e1e02))
- **liquid:** fix liquid precision ([#5788](https://github.com/antvis/g2/issues/5788)) ([07196d1](https://github.com/antvis/g2/commit/07196d1874766419cc9ee14bf3bd8bd2d3378328))
- **mark:** delete ava type ([#5782](https://github.com/antvis/g2/issues/5782)) ([dc4a511](https://github.com/antvis/g2/commit/dc4a5118d662b3a1109b8f889879f4b30395d21d))
- render error when signle data in point mark ([#5785](https://github.com/antvis/g2/issues/5785)) ([0992faa](https://github.com/antvis/g2/commit/0992faa77763674669b3d068f6e9e1257e736f7d))
- specify TZ=Asia/Shanghai ([#5776](https://github.com/antvis/g2/issues/5776)) ([e6ab2fe](https://github.com/antvis/g2/commit/e6ab2fe2331245d4f164a98ff19dbbaca2a268ef))

### Features

- add default format to tooltip title [#5684](https://github.com/antvis/g2/issues/5684) ([#5748](https://github.com/antvis/g2/issues/5748)) ([b7e9055](https://github.com/antvis/g2/commit/b7e90556d552f66bc0d787cff168032c283bc11e))

## [5.1.7](https://github.com/antvis/g2/compare/5.1.6...5.1.7) (2023-11-08)

### Bug Fixes

- add style.minHeight to interval ([#5715](https://github.com/antvis/g2/issues/5715)) ([bbfad52](https://github.com/antvis/g2/commit/bbfad529db693253c678abbc51ac0cc3220d070e))
- **line:** use curveMonotone ([#5751](https://github.com/antvis/g2/issues/5751)) ([2bedfba](https://github.com/antvis/g2/commit/2bedfba0bbb8d182b7eedfe70d50ec6e633ea4a4))
- set transform-origin in each keyframe ([#5679](https://github.com/antvis/g2/issues/5679)) ([c49cf09](https://github.com/antvis/g2/commit/c49cf09fd25ce0aa1ca5eced0907be1b7295f451))
- **test:** update snapshot ([#5755](https://github.com/antvis/g2/issues/5755)) ([61c8374](https://github.com/antvis/g2/commit/61c8374c279c595087cd423121edac8486ad0d67))

## [5.1.6](https://github.com/antvis/g2/compare/5.1.6-beta.0...5.1.6) (2023-10-20)

### Bug Fixes

- auto fit ([#5649](https://github.com/antvis/g2/issues/5649)) ([c9a0d90](https://github.com/antvis/g2/commit/c9a0d90807ef46bd7b9fd5052fc2c1a1d951dad1))
- **axis:** auto hide when necessary ([#5660](https://github.com/antvis/g2/issues/5660)) ([a02fb8e](https://github.com/antvis/g2/commit/a02fb8eb71640bd1c21ec0cad86c4bfe0f79524a))
- **slider:** multiple times ([#5638](https://github.com/antvis/g2/issues/5638)) ([d88016a](https://github.com/antvis/g2/commit/d88016ad1ba960785448bd1891369e46f83e3cab))
- **tooltip:** shared tooltip with scrollbar ([#5665](https://github.com/antvis/g2/issues/5665)) ([0870bb7](https://github.com/antvis/g2/commit/0870bb791200eda8c77abe38c12113cf96ef8cad))

## [5.1.5](https://github.com/antvis/g2/compare/5.1.5-beta.0...5.1.5) (2023-09-28)

### Bug Fixes

- bundle sideEffects config ([#5603](https://github.com/antvis/g2/issues/5603)) ([dbbedfe](https://github.com/antvis/g2/commit/dbbedfebdb4118c92ecac852e76402824f05d3e0))
- **tooltip:** destroy when reapply ([#5601](https://github.com/antvis/g2/issues/5601)) ([b4c977f](https://github.com/antvis/g2/commit/b4c977f1bfff4247c9917e3ffd74df493daf9315))

### Features

- add 3 bundle file ([#5597](https://github.com/antvis/g2/issues/5597)) ([ba0c945](https://github.com/antvis/g2/commit/ba0c94534b57273c9e59f91ef772d8f4c4954c57))
- add auto mark ([#5585](https://github.com/antvis/g2/issues/5585)) ([01c52a6](https://github.com/antvis/g2/commit/01c52a685c5a88593da9e43238b28deec8a4e7a3))

## [5.1.5-beta.0](https://github.com/antvis/g2/compare/5.1.4...5.1.5-beta.0) (2023-09-25)

### Bug Fixes

- **connector:** fix connectLength1 default value getting ([#5587](https://github.com/antvis/g2/issues/5587)) ([7e39af9](https://github.com/antvis/g2/commit/7e39af970f58205db32308af7facd8066908373c))
- **tooltip:** for fisheye ([#5590](https://github.com/antvis/g2/issues/5590)) ([b39be0a](https://github.com/antvis/g2/commit/b39be0a1deebafbf6f92485ea662f798d23ad6a8))
- **tooltip:** marker ([#5586](https://github.com/antvis/g2/issues/5586)) ([30450c3](https://github.com/antvis/g2/commit/30450c33168ba4097f1dac5f33c8fd63adfeedc8))
- **tooltp:** cloned series invert ([#5588](https://github.com/antvis/g2/issues/5588)) ([bece2a7](https://github.com/antvis/g2/commit/bece2a7ad2f8cc87cac9c14da93d9398b781e498))
- 修复 `site/docs/../intervalThreed.zh.md` 中元素全部为黑的问题 ([#5573](https://github.com/antvis/g2/issues/5573)) ([c32bca0](https://github.com/antvis/g2/commit/c32bca08f539b19efd02c7f6c832839f33b8a819))

### Features

- **facet:** support legend filter ([#5593](https://github.com/antvis/g2/issues/5593)) ([05a49ac](https://github.com/antvis/g2/commit/05a49ace0ac28f8aea1fc0c6b3b9ce672ddc8fc7))
- show theme editor ([#5579](https://github.com/antvis/g2/issues/5579)) ([9c26412](https://github.com/antvis/g2/commit/9c26412ae2e25a9e24782f63b07ababd26741471))
- **theme:** add dark and update academy theme ([#5584](https://github.com/antvis/g2/issues/5584)) ([051d719](https://github.com/antvis/g2/commit/051d7196a49d1bc9a488c48334324e230a7285f5))

## [5.1.4](https://github.com/antvis/g2/compare/5.1.3...5.1.4) (2023-09-20)

### Bug Fixes

- **api:** only remove created container ([#5567](https://github.com/antvis/g2/issues/5567)) ([7be3ddf](https://github.com/antvis/g2/commit/7be3ddf8083ba2ab8cf63f6cd695e70324ecf03b))
- **tooltip:** find closest for band scale ([#5564](https://github.com/antvis/g2/issues/5564)) ([e543e0e](https://github.com/antvis/g2/commit/e543e0ecc572a0412972168d1c2728e385996447))

### Features

- **tooltip:** support css ([#5563](https://github.com/antvis/g2/issues/5563)) ([8a10429](https://github.com/antvis/g2/commit/8a104298434b91f342c9f7b2b70d50198b2013e3))

## [5.1.3](https://github.com/antvis/g2/compare/5.1.2...5.1.3) (2023-09-18)

### Bug Fixes

- **CONTRIBUTING.md:** fix incorrect file path ([#5556](https://github.com/antvis/g2/issues/5556)) ([f400dcd](https://github.com/antvis/g2/commit/f400dcd7224a3f11a9b9e1b2100ba3a59e21f510))
- restore to last cursor not default ([#5553](https://github.com/antvis/g2/issues/5553)) ([e688283](https://github.com/antvis/g2/commit/e688283d9b4fdc79559e8402405a271aff29bd3c))
- set target to es6 for umd ([#5559](https://github.com/antvis/g2/issues/5559)) ([5afd45a](https://github.com/antvis/g2/commit/5afd45a2687204137ef40fb34fceea34cf358e34))

## [5.1.2](https://github.com/antvis/g2/compare/5.1.1...5.1.2) (2023-09-13)

### Bug Fixes

- **dual:** set series of line to band scale ([#5528](https://github.com/antvis/g2/issues/5528)) ([1446b1a](https://github.com/antvis/g2/commit/1446b1a4f0798304b8257c741bb3d0f1d189df2c))
- **pie:** interaction for composite mark ([#5524](https://github.com/antvis/g2/issues/5524)) ([ae3138c](https://github.com/antvis/g2/commit/ae3138c150a774703b9404b61d98b0b388e8f541))
- remove console.log in runtime ([#5532](https://github.com/antvis/g2/issues/5532)) ([e9486dc](https://github.com/antvis/g2/commit/e9486dcda4de02f959493eac5a0db90b89ade29a))
- **tooltip:** legendFilter and shared tooltip ([#5534](https://github.com/antvis/g2/issues/5534)) ([7fc3e75](https://github.com/antvis/g2/commit/7fc3e7521ec18bb5c9b20d8544a6e9f0a615a4ef))
- **types:** composition node ([#5527](https://github.com/antvis/g2/issues/5527)) ([88fdb41](https://github.com/antvis/g2/commit/88fdb4148432f02c5cb8f9e30b09cfac6298fbad))

### Features

- add mark.liquid ([#5508](https://github.com/antvis/g2/issues/5508)) ([69540e3](https://github.com/antvis/g2/commit/69540e327fe97debba0b0194e9a9fe5dd738cbee))
- **canvas:** set feat/supportsCSSTransform to true by default ([#5526](https://github.com/antvis/g2/issues/5526)) ([ab59152](https://github.com/antvis/g2/commit/ab591522b5538c351c09679c1451097a21766363))
- **examples:** 新增子弹图案例 ([#5530](https://github.com/antvis/g2/issues/5530)) ([3ae84d4](https://github.com/antvis/g2/commit/3ae84d4715a6c6fcc7a0261834225cf981a929f4))

## [5.1.1](https://github.com/antvis/g2/compare/5.1.0...5.1.1) (2023-09-07)

### Bug Fixes

- **axis:** labelAutoHide ([#5502](https://github.com/antvis/g2/issues/5502)) ([4dfdaff](https://github.com/antvis/g2/commit/4dfdaff76ee0584a1d9bb139b6fa6404145dbd22))
- **shape:** update group shape without animation ([#5514](https://github.com/antvis/g2/issues/5514)) ([a49624b](https://github.com/antvis/g2/commit/a49624b9a7a6503989e8e08d8dfa5937999f8a21))

### Features

- **interaction:** emit more brush and tooltip events ([#5512](https://github.com/antvis/g2/issues/5512)) ([57cc841](https://github.com/antvis/g2/commit/57cc841e17969ac3e686061bf8aa821c616460c7))

# [5.1.0](https://github.com/antvis/g2/compare/5.0.24...5.1.0) (2023-08-31)

### Bug Fixes

- **runtime:** process data ([#5494](https://github.com/antvis/g2/issues/5494)) ([b851ca3](https://github.com/antvis/g2/commit/b851ca34f585485c5855924ed92061c21f92d43f))

### Features

- update category20 ([#5495](https://github.com/antvis/g2/issues/5495)) ([83bcc17](https://github.com/antvis/g2/commit/83bcc17a0e044779268a8cb6748b043ab6efbd16))

## [5.0.24](https://github.com/antvis/g2/compare/5.0.23...5.0.24) (2023-08-30)

### Bug Fixes

- **test:** call defined render function ([#5481](https://github.com/antvis/g2/issues/5481)) ([c0c5746](https://github.com/antvis/g2/commit/c0c574683f3cd97b1813fa3dc7454137b8ae6ad4))
- **theme:** update default color of light theme ([#5487](https://github.com/antvis/g2/issues/5487)) ([7cbe9a7](https://github.com/antvis/g2/commit/7cbe9a7cf8ea537c274288c4f55118b9544ae622))

### Features

- 3d line plot ([#5471](https://github.com/antvis/g2/issues/5471)) ([4d157cd](https://github.com/antvis/g2/commit/4d157cd162a805d8a68a29a5abf216074fb2058f))
- **builtinlib:** move some components from core to builtinlib ([#5485](https://github.com/antvis/g2/issues/5485)) ([fc70bf5](https://github.com/antvis/g2/commit/fc70bf5423b73b1b06ff3b551e2a5a5902dd3527))
- **lib:** change graphlib and plotlib ([#5484](https://github.com/antvis/g2/issues/5484)) ([ad175a0](https://github.com/antvis/g2/commit/ad175a0b232552c94c3c6d6305da28a9c42ee497))

## [5.0.23](https://github.com/antvis/g2/compare/5.0.22...5.0.23) (2023-08-29)

### Bug Fixes

- **libs:** export expected libs ([#5478](https://github.com/antvis/g2/issues/5478)) ([564b3a6](https://github.com/antvis/g2/commit/564b3a6a7c93f18941c60c27d6c43f56b187d4a4))
- **types:** export ChartOptions from RuntimeOptions ([#5475](https://github.com/antvis/g2/issues/5475)) ([73ded25](https://github.com/antvis/g2/commit/73ded250e8a78ade9d23234e953ecfb5702f654d))

### Features

- add light theme ([#5342](https://github.com/antvis/g2/issues/5342)) ([ffc8096](https://github.com/antvis/g2/commit/ffc80962a1fa833ad144ff28f173cb1518ab2ca8))
- **connector:** support offset ([#5476](https://github.com/antvis/g2/issues/5476)) ([437b8c3](https://github.com/antvis/g2/commit/437b8c3930b032ba45eb1747507f60f588ff0e70))

## [5.0.22](https://github.com/antvis/g2/compare/0.5.21...5.0.22) (2023-08-24)

### Bug Fixes

- **dep:** add @antv/g-plugin-3d to dependencies ([cb1c4b8](https://github.com/antvis/g2/commit/cb1c4b827ee1d97efd793aa3f68e703374227560))

## [5.0.21](https://github.com/antvis/g2/compare/5.0.20...5.0.21) (2023-08-23)

### Bug Fixes

- **compile:** require of ES Module bug in ssr ([#5450](https://github.com/antvis/g2/issues/5450)) ([769666a](https://github.com/antvis/g2/commit/769666ae25a7388cd97105a020a00f00fbd55bc5))
- **coordinate:** layout ([#5447](https://github.com/antvis/g2/issues/5447)) ([9607f1d](https://github.com/antvis/g2/commit/9607f1d8d8809d51a7e346dcec07149d52f511e8))
- lint issues from [#5440](https://github.com/antvis/g2/issues/5440) ([#5446](https://github.com/antvis/g2/issues/5446)) ([c98e176](https://github.com/antvis/g2/commit/c98e17646dedc4704f82bb9a01c2e4e991aab1c2))
- skip resizing canvas if width or height remains the same ([#5432](https://github.com/antvis/g2/issues/5432)) ([a91214a](https://github.com/antvis/g2/commit/a91214abef813ca0a5c2c354cd37f2a59103feaa))

### Features

- sphere shape used in 3d lib [#5375](https://github.com/antvis/g2/issues/5375) ([#5412](https://github.com/antvis/g2/issues/5412)) ([85abdc3](https://github.com/antvis/g2/commit/85abdc3ab0ad9be917169fb26fe806887da470ab))

## [5.0.20](https://github.com/antvis/g2/compare/5.0.19...5.0.20) (2023-08-17)

### Bug Fixes

- **interaction:** multi interaction ([#5419](https://github.com/antvis/g2/issues/5419)) ([328aeea](https://github.com/antvis/g2/commit/328aeeac34e770ff2c28f5b1a8ad704ab00af0a5))
- **types:** add types for Chart interface ([acd81b9](https://github.com/antvis/g2/commit/acd81b93facc110015a38922e766a1fe5d7f9069))

## [5.0.19](https://github.com/antvis/g2/compare/5.0.18...5.0.19) (2023-08-15)

### Bug Fixes

- axis arrow direction ([#5359](https://github.com/antvis/g2/issues/5359)) ([75b7965](https://github.com/antvis/g2/commit/75b7965a15dd3759ad6d6a7c50b86fccc5f425f0))
- label dom leak when chart re-render ([#5392](https://github.com/antvis/g2/issues/5392)) ([18e6626](https://github.com/antvis/g2/commit/18e66263fde6e768f5c96bda7b83a8d791d2f4d2))
- projection null ([#5381](https://github.com/antvis/g2/issues/5381)) ([b34fa72](https://github.com/antvis/g2/commit/b34fa7205729d5b63edd5bd95ec8a24b96b44cad))

## [5.0.18](https://github.com/antvis/g2/compare/5.0.17...5.0.18) (2023-08-02)

### Bug Fixes

- **api:** broken links ([#5352](https://github.com/antvis/g2/issues/5352)) ([66c58af](https://github.com/antvis/g2/commit/66c58afc0f7ae90c3f7a5fe23743853a6eb01b77))
- broken link for wordcloud ([#5353](https://github.com/antvis/g2/issues/5353)) ([b883e5d](https://github.com/antvis/g2/commit/b883e5de0b26e4d58e08e9b30b8d7b88381555e1))
- **line-xy:** support bandOffset ([#5351](https://github.com/antvis/g2/issues/5351)) ([0851471](https://github.com/antvis/g2/commit/085147125d83296cad75b73a2d1cfc3933860af5))

### Features

- html label supported ([#5354](https://github.com/antvis/g2/issues/5354)) ([64137e1](https://github.com/antvis/g2/commit/64137e1a770af0d7f7d28455861171b34b6fe801))
- **interaction:** support continuous legend filter ([#5356](https://github.com/antvis/g2/issues/5356)) ([5f866cb](https://github.com/antvis/g2/commit/5f866cbc85ddc2022bd81583e497c6e694374056))

## [5.0.17](https://github.com/antvis/g2/compare/5.0.16...5.0.17) (2023-07-25)

### Bug Fixes

- **auto:** axis without label ([#5338](https://github.com/antvis/g2/issues/5338)) ([06b73c2](https://github.com/antvis/g2/commit/06b73c2e71a0a406fd3af8f76ff51f2eb3326e12))
- **chart:** chart.clear preserve some global options ([#5318](https://github.com/antvis/g2/issues/5318)) ([0c4fc99](https://github.com/antvis/g2/commit/0c4fc99cfa54bf56328f4a6eebc3619534414b35))
- git clone failed on windows due to filename contains character : ([#5330](https://github.com/antvis/g2/issues/5330)) ([682885b](https://github.com/antvis/g2/commit/682885b3d0c643dc1f4f53c7fbfcf75e3a0ad247))
- **label:** clear invalid labels ([#5310](https://github.com/antvis/g2/issues/5310)) ([0a760b8](https://github.com/antvis/g2/commit/0a760b8ebea9a857d1f3abe1cd6762c8005b1267))
- **legend:** set actual item size ([#5326](https://github.com/antvis/g2/issues/5326)) ([683d529](https://github.com/antvis/g2/commit/683d529aef66982b6dab4d3035ccbb8268b20afa))

### Features

- **size:** support ordinal size channel ([#5320](https://github.com/antvis/g2/issues/5320)) ([760eb75](https://github.com/antvis/g2/commit/760eb75d97a746621da35d26d4a7565fec94551b))
- **title:** auto layout ([#5332](https://github.com/antvis/g2/issues/5332)) ([778cdf3](https://github.com/antvis/g2/commit/778cdf33432c0284f1a6ca1a18536bb8766edb76))

## [5.0.16](https://github.com/antvis/g2/compare/5.0.15...5.0.16) (2023-07-12)

### Bug Fixes

- **event:** emit events for extended shape ([#5290](https://github.com/antvis/g2/issues/5290)) ([873bec7](https://github.com/antvis/g2/commit/873bec72f6a75e2c581df24d49afa239b5a5995e))
- **legend:** category do not update position ([#5304](https://github.com/antvis/g2/issues/5304)) ([95c9950](https://github.com/antvis/g2/commit/95c99507b166c23134dcfd4ed7a2c108bc649b43))
- **slider:** index scale by scaleKey ([#5291](https://github.com/antvis/g2/issues/5291)) ([50d1fa5](https://github.com/antvis/g2/commit/50d1fa595b94ca16b485e748b64a4aaa6c44eb8a))
- **update:** set markType for element ([#5293](https://github.com/antvis/g2/issues/5293)) ([6ae86b7](https://github.com/antvis/g2/commit/6ae86b73b67bc0edbba11404dd935258392364cb))

## [5.0.15](https://github.com/antvis/g2/compare/5.0.14...5.0.15) (2023-07-07)

### Bug Fixes

- **axis:** axis pos when update ([#5275](https://github.com/antvis/g2/issues/5275)) ([63f337b](https://github.com/antvis/g2/commit/63f337b383f87e92787659cd21b093de2c35dfaa))
- clear transform when animation finished ([#5277](https://github.com/antvis/g2/issues/5277)) ([db77f1b](https://github.com/antvis/g2/commit/db77f1b99e0892f4c6b1bd9753f5e7908720f4d1))
- **layout:** valid specified component size ([#5264](https://github.com/antvis/g2/issues/5264)) ([e9edea2](https://github.com/antvis/g2/commit/e9edea2c0a96bfb04805d449002729dbe2205eb5))
- **legend:** continuous legend set labelOverlap to hdie by default ([#5278](https://github.com/antvis/g2/issues/5278)) ([76698dc](https://github.com/antvis/g2/commit/76698dc2dac49359379b05360793a562126de2cd))
- **legend:** filter with pages ([#5284](https://github.com/antvis/g2/issues/5284)) ([e712ac4](https://github.com/antvis/g2/commit/e712ac482bfad9b4d611c179d3cfff38b21cd0df))
- **legend:** update legend item ([#5258](https://github.com/antvis/g2/issues/5258)) ([48873ba](https://github.com/antvis/g2/commit/48873ba1ff5838ad176d0c8fe323a353b1118b93))
- **slider:** with annotation ([#5280](https://github.com/antvis/g2/issues/5280)) ([9418bdd](https://github.com/antvis/g2/commit/9418bdd8052acd80bd16c62c4cd6c5627571d299))
- **tooltip:** multi chart when mounting to body ([#5283](https://github.com/antvis/g2/issues/5283)) ([17ed2cb](https://github.com/antvis/g2/commit/17ed2cb3ecacde34fa92b6c85db5973dc2e73b87))

### Features

- **interval:** micro interval ([#5260](https://github.com/antvis/g2/issues/5260)) ([5190059](https://github.com/antvis/g2/commit/51900599d807b8bd6d34e32605c8ecda2cf14bfa))
- **slider:** auto layout ([#5274](https://github.com/antvis/g2/issues/5274)) ([7ff0978](https://github.com/antvis/g2/commit/7ff09788a00b1225c443e007f81f5e998219346d))

## [5.0.14](https://github.com/antvis/g2/compare/5.0.13...5.0.14) (2023-06-28)

### Bug Fixes

- **api:** replace deepMix with deepAssign ([#5232](https://github.com/antvis/g2/issues/5232)) ([7bf049c](https://github.com/antvis/g2/commit/7bf049cc4cd00176f916e934f43fd1cd44e682f0))
- **area:** one missing point ([#5229](https://github.com/antvis/g2/issues/5229)) ([4977031](https://github.com/antvis/g2/commit/4977031ff8a377548ba9233fe073962730ee6075))
- **axis:** auto padding axis label rotate fail ([#5238](https://github.com/antvis/g2/issues/5238)) ([fc665da](https://github.com/antvis/g2/commit/fc665dad1e56f78a19baa08677b8cb7a3707ef53))
- **inset:** relative position for text in polar ([#5223](https://github.com/antvis/g2/issues/5223)) ([567717b](https://github.com/antvis/g2/commit/567717be85c851499437856979d180509aef2e71))
- **layout:** auto inset ignore null bbox ([#5228](https://github.com/antvis/g2/issues/5228)) ([582c494](https://github.com/antvis/g2/commit/582c4943a514cde23320ff959c1cd38ab452efc2))
- **line:** series gradient ([#5225](https://github.com/antvis/g2/issues/5225)) ([07cc02a](https://github.com/antvis/g2/commit/07cc02aba2f268cc4b6e0a723acdd71dad974c8e))
- **line:** support missing trail ([#5227](https://github.com/antvis/g2/issues/5227)) ([3eb6b61](https://github.com/antvis/g2/commit/3eb6b6180c4910db7fcafe143dbdf797b37f02db))

### Features

- tooltip interaction emit events when body hide ([#5157](https://github.com/antvis/g2/issues/5157)) ([b8491c3](https://github.com/antvis/g2/commit/b8491c33c7736cfe1e0a2c2ee1824e60c727d2cc))
- **tooltip:** disableNative ([#5236](https://github.com/antvis/g2/issues/5236)) ([70d847f](https://github.com/antvis/g2/commit/70d847fea472e85e2e713b71f75c684f22a2c38d))

## [5.0.13](https://github.com/antvis/g2/compare/5.0.12...5.0.13) (2023-06-20)

### Bug Fixes

- **brush:** emit brush remove ([#5170](https://github.com/antvis/g2/issues/5170)) ([1a554e5](https://github.com/antvis/g2/commit/1a554e5d72cc8916624dcd52532a9f95c88b9dd0))
- label show error when missing data ([#5175](https://github.com/antvis/g2/issues/5175)) ([30cf701](https://github.com/antvis/g2/commit/30cf701b4e45c690a2aede69a1b78082ce9f3087))

### Features

- **layout:** auto inset ([#5204](https://github.com/antvis/g2/issues/5204)) ([25dd207](https://github.com/antvis/g2/commit/25dd2070b23b1c9954ebd13b00bb2f84250cd1a3))
- **legend:** optimize ([#5202](https://github.com/antvis/g2/issues/5202)) ([fbebfc5](https://github.com/antvis/g2/commit/fbebfc57510a800b2e87a9ed9831ffe618922e49))
- **static-mark:** add axisX and axisY ([#5188](https://github.com/antvis/g2/issues/5188)) ([28e39f0](https://github.com/antvis/g2/commit/28e39f0f9fabdd416cc83743ef82032fbc1790d8))
- **static-mark:** add legends ([#5209](https://github.com/antvis/g2/issues/5209)) ([e6fcfe3](https://github.com/antvis/g2/commit/e6fcfe329c131bb64b352601d210b90e1ab262dc))

## [5.0.12](https://github.com/antvis/g2/compare/5.0.11...5.0.12) (2023-06-08)

### Bug Fixes

- calculate band offset in area mark ([#5148](https://github.com/antvis/g2/issues/5148)) ([19d7f68](https://github.com/antvis/g2/commit/19d7f688fe22889fbe9773ca867067bf16e546ef))
- chart.options do not show title ([#5147](https://github.com/antvis/g2/issues/5147)) ([17eb842](https://github.com/antvis/g2/commit/17eb8428728003a6a2b11547b3022becf996f8bb))

### Features

- add venn chart demo, tests ([#5129](https://github.com/antvis/g2/issues/5129)) ([36b9b02](https://github.com/antvis/g2/commit/36b9b025c414ba827959ef1bc9aa2d061c3b9820))
- **interaction:** add scrollbarFilter ([#5152](https://github.com/antvis/g2/issues/5152)) ([72e0cc4](https://github.com/antvis/g2/commit/72e0cc414548fd1e21c8e8dae7c874e530f9e29d))
- **interaction:** emit brush axis highlight ([#5132](https://github.com/antvis/g2/issues/5132)) ([534c1ef](https://github.com/antvis/g2/commit/534c1efcf6a2ad436d5629645cf2ca71f1078ea2))
- **interaction:** emit element highlight ([#5117](https://github.com/antvis/g2/issues/5117)) ([44b8ee5](https://github.com/antvis/g2/commit/44b8ee5abf2cf33dcef61ee753023c9464154bed))
- **interaction:** emit element select ([#5119](https://github.com/antvis/g2/issues/5119)) ([ea20755](https://github.com/antvis/g2/commit/ea20755b5926073b073e0a3549e455c4c9d40c61))
- **interaction:** emit legend filter ([#5127](https://github.com/antvis/g2/issues/5127)) ([b7071ef](https://github.com/antvis/g2/commit/b7071effd62579db9b80b4d9de6dca0a080879c3))
- **interaction:** emit legend highlight ([#5126](https://github.com/antvis/g2/issues/5126)) ([e796355](https://github.com/antvis/g2/commit/e796355354469d53b8c3f5165beebb865ed59fb0))
- **interaction:** emit slider filter ([#5114](https://github.com/antvis/g2/issues/5114)) ([32ac0f6](https://github.com/antvis/g2/commit/32ac0f6ba02badbb2a12a41dd581e73083b45b38))
- interval shape has max/min width ([#5123](https://github.com/antvis/g2/issues/5123)) ([7b50766](https://github.com/antvis/g2/commit/7b5076663c0432dc4f4808386b4ed80ee59efa85))
- **line:** add trail shape ([#5137](https://github.com/antvis/g2/issues/5137)) ([34937ea](https://github.com/antvis/g2/commit/34937ea26448cb8bcc80a0b9c362e9387b99b843))

## [5.0.11](https://github.com/antvis/g2/compare/5.0.10...5.0.11) (2023-05-26)

### Bug Fixes

- **api:** update mark-level plot and apply viewStyle ([#5102](https://github.com/antvis/g2/issues/5102)) ([f239cba](https://github.com/antvis/g2/commit/f239cba0823022cf3703891c8b47c323f8c4cd46))
- **chart:** chart.options should remove node ([#5103](https://github.com/antvis/g2/issues/5103)) ([6949459](https://github.com/antvis/g2/commit/6949459bdd159bc540b07a33791337b681f29fa0))
- **data:** render empty data ([#5098](https://github.com/antvis/g2/issues/5098)) ([6de9e33](https://github.com/antvis/g2/commit/6de9e3399cd4cc1205e2ee2ea2efcacc0f512ffb))
- **event:** there is no target for pointerupoutside event ([#5100](https://github.com/antvis/g2/issues/5100)) ([641f966](https://github.com/antvis/g2/commit/641f9666b52990b28467b50475fa5280913efd3c))
- **geo:** highlight choropleth ([#5095](https://github.com/antvis/g2/issues/5095)) ([7a4d06d](https://github.com/antvis/g2/commit/7a4d06d9d7927fb17d8170f210be54ad93aa8f3c))
- **label:** null value for series mark ([#5099](https://github.com/antvis/g2/issues/5099)) ([a1db7aa](https://github.com/antvis/g2/commit/a1db7aa07fba40a85bd5239b2ef1479ba487820d))

### Features

- add heatmap mark and shape ([#5047](https://github.com/antvis/g2/issues/5047)) ([67d88f4](https://github.com/antvis/g2/commit/67d88f4e92986ac5d21bee6975d15f6821974aff))

## [5.0.10](https://github.com/antvis/g2/compare/5.0.9...5.0.10) (2023-05-25)

### Bug Fixes

- **site:** disable css parsing ([#5091](https://github.com/antvis/g2/issues/5091)) ([c21787f](https://github.com/antvis/g2/commit/c21787ffcef4600b7a24f7fb88189511c495b71b))

## [5.0.9](https://github.com/antvis/g2/compare/5.0.8...5.0.9) (2023-05-25)

### Bug Fixes

- **brush:** handle brush:highlight once when emit ([#5063](https://github.com/antvis/g2/issues/5063)) ([321fb1b](https://github.com/antvis/g2/commit/321fb1bce8e177cfc2d9ea83cdb1291c3fd6c728))
- example typo ([#5064](https://github.com/antvis/g2/issues/5064)) ([e2e8a5f](https://github.com/antvis/g2/commit/e2e8a5fafe12a71c85a3275faa1f220d4a7fc62a))
- **interaction:** interaction can be clear ([#5087](https://github.com/antvis/g2/issues/5087)) ([f489fba](https://github.com/antvis/g2/commit/f489fba7c6802cc75ec4c81017ec8924c2f9b0e7))
- label formatter callback params ([#5062](https://github.com/antvis/g2/issues/5062)) ([1ee4b1f](https://github.com/antvis/g2/commit/1ee4b1fa252bb2a4dc0fa303242c46239024239c))
- **label:** support date label ([#5077](https://github.com/antvis/g2/issues/5077)) ([826e000](https://github.com/antvis/g2/commit/826e000bb6009aea8b29ca452aea4f6caa9355df))
- **legend:** pass legend.style ([#5084](https://github.com/antvis/g2/issues/5084)) ([f915d02](https://github.com/antvis/g2/commit/f915d021ca1c189271bc7bffdbe94632fd014595))

### Features

- **api:** use api and spec together ([#5074](https://github.com/antvis/g2/issues/5074)) ([e18cc84](https://github.com/antvis/g2/commit/e18cc8411f5439c57268e0c180f61ad62a96daa1))
- **axis:** set default tickCount to 5 ([#5086](https://github.com/antvis/g2/issues/5086)) ([bbfe665](https://github.com/antvis/g2/commit/bbfe665b80e6f417537f5760033e3ed4c729504c))
- **chart:** debounce chart.render ([#5083](https://github.com/antvis/g2/issues/5083)) ([106b807](https://github.com/antvis/g2/commit/106b807ab2db91253287e41f857a9706f44c0039))
- set tooltip dom classname has `g2-` prefix ([#5066](https://github.com/antvis/g2/issues/5066)) ([c8b62f6](https://github.com/antvis/g2/commit/c8b62f6f88432c69ba1d6aa00e91c73bc4ce6a4f))

## [5.0.8](https://github.com/antvis/g2/compare/5.0.7...5.0.8) (2023-05-19)

### Bug Fixes

- **brush:** rerender don't emit brush:end ([#5053](https://github.com/antvis/g2/issues/5053)) ([f07b512](https://github.com/antvis/g2/commit/f07b512bb0f116f056a4373f6323195683405786))
- **brush:** upper bound for selection ([#5044](https://github.com/antvis/g2/issues/5044)) ([b6ea831](https://github.com/antvis/g2/commit/b6ea8318653432c1cf54aca087ff3fb64334cfbe))
- **chart:** chart.forceFit rerender only when size changing ([#5052](https://github.com/antvis/g2/issues/5052)) ([ab0ccf7](https://github.com/antvis/g2/commit/ab0ccf725713b628e0bb0188e9269bc19e4f1722))

### Features

- add density mark, violin shape and kde transform ([#5043](https://github.com/antvis/g2/issues/5043)) ([f961d24](https://github.com/antvis/g2/commit/f961d2487c0cb387aef9075acd48a8c82ad2ff40))
- **dimension:** auto padding ([#5046](https://github.com/antvis/g2/issues/5046)) ([914d445](https://github.com/antvis/g2/commit/914d445f75c54c293af2fffbd6906cda0fd1ab00))

## [5.0.7](https://github.com/antvis/g2/compare/5.0.6...5.0.7) (2023-05-16)

### Bug Fixes

- **animation:** update non-transform attribute and replace node without animation ([#5019](https://github.com/antvis/g2/issues/5019)) ([4adbd58](https://github.com/antvis/g2/commit/4adbd587c73bdeca7cb301afd52d7cfa874b2ed7)), closes [#4953](https://github.com/antvis/g2/issues/4953) [#5006](https://github.com/antvis/g2/issues/5006)
- **axis:** autoHide should not set crossSize ([#5032](https://github.com/antvis/g2/issues/5032)) ([86052fc](https://github.com/antvis/g2/commit/86052fced2b165b13a5dc2e0c37617a3dcd9c1f3))
- change data wont update ([#5002](https://github.com/antvis/g2/issues/5002)) ([349a9f4](https://github.com/antvis/g2/commit/349a9f4b015de11804ccc1f2847e10dc4ace24e8))
- fix issue that legend category cannot update shape ([#4968](https://github.com/antvis/g2/issues/4968)) ([152bc18](https://github.com/antvis/g2/commit/152bc18c6820e25e903ec33e12f7382fe960a0c8))
- **legend-filter:** funnel ([#4960](https://github.com/antvis/g2/issues/4960)) ([be67dfa](https://github.com/antvis/g2/commit/be67dfa176742f8cf7b9fca165f55ddfca63f3f1))
- **link:** right env var ([#5027](https://github.com/antvis/g2/issues/5027)) ([6481b00](https://github.com/antvis/g2/commit/6481b0094880a9d3cbe4f6853763013d1c1acd67))
- **point:** opacityAttribute default to colorAttribute ([#4981](https://github.com/antvis/g2/issues/4981)) ([79399d0](https://github.com/antvis/g2/commit/79399d037809e86b447ff3cb7264a262811621e5))
- **scale:** zero domain min and max ([#5014](https://github.com/antvis/g2/issues/5014)) ([2e92914](https://github.com/antvis/g2/commit/2e9291492d1542533318b70f7d937163b8a3b9f3))
- svg renderer not works in website demo ([#5000](https://github.com/antvis/g2/issues/5000)) ([b94ef47](https://github.com/antvis/g2/commit/b94ef47abb42d1b95c16ba9417256b64c1748eac))
- **tooltip:** rerender correctly ([#4962](https://github.com/antvis/g2/issues/4962)) ([f85e72f](https://github.com/antvis/g2/commit/f85e72f8e8e94d048835cafe44d7612d3ad69087))

### Features

- add thresholds params in gauge mark ([#5021](https://github.com/antvis/g2/issues/5021)) ([66a4a8e](https://github.com/antvis/g2/commit/66a4a8ecc16586c2d74155bbde479e2797f53520))
- **brush:** support resize and custom ([#5012](https://github.com/antvis/g2/issues/5012)) ([857fa7b](https://github.com/antvis/g2/commit/857fa7b2ff6d99f8509d2f99cfa949eb640109c3))
- **event:** emit plot events ([#5034](https://github.com/antvis/g2/issues/5034)) ([67576ac](https://github.com/antvis/g2/commit/67576ac91dcb94dc7fc834ff8c7f015cbe23a814))
- tooltip render to mount dom ([#5025](https://github.com/antvis/g2/issues/5025)) ([d6e098f](https://github.com/antvis/g2/commit/d6e098f022e8c3c217f5907584dda01eaadb0b34))
- **tooltip:** on and emit ([#4980](https://github.com/antvis/g2/issues/4980)) ([5f64f71](https://github.com/antvis/g2/commit/5f64f7165a14de0d66350fb7316654027b6bce7c))
- update gui and adapt to crossSize config ([#4949](https://github.com/antvis/g2/issues/4949)) ([d1d9b8d](https://github.com/antvis/g2/commit/d1d9b8d1268e7fc95bdf63c3975fce88033e2257))

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
