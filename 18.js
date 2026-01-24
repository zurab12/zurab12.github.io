(function () {
    'use strict';

    function SmartTV_Plugin(object) {
        var network = new Lampa.Reguest();
        var scroll  = new Lampa.Scroll({mask: true, over: true});
        var items   = [];
        var html    = $('<div></div>');
        var body    = $('<div class="category-full"></div>');
        
        // Данные каналов
        var data_groups = [
            {
                title: '🇷🇺 Эфирные каналы',
                channels: [
                    { name: 'Первый HD', url: 'https://cdn10.1internet.tv/dash-live12/streams/1tv/1tvdash.mpd', logo: 'http://epg.it999.ru/img2/983.png' },
                    { name: 'Россия HD', url: 'http://cdnmg.secure.live.rtr-vesti.ru/hls2/russia_hd/playlist_6.m3u8', logo: 'http://epg.it999.ru/img2/984.png' },
                    { name: 'НТВ HD', url: 'https://ntv-hls-orig.cdnvideo.ru/ntv0_hd/tracks-v1a1/mono.m3u8', logo: 'http://epg.it999.ru/img2/2001.png' },
                    { name: 'ТВ Центр HD', url: 'http://hls.peers.tv/streaming/tvc_hd/126/copy/playlist.m3u8?token=d680c0c502834299a358e0c1783e9f94&client=97', logo: 'http://epg.it999.ru/img2/649.png' },
                    { name: 'РЕН ТВ', url: 'http://flu.ttk.mx:9090/REN_TV/index.m3u8?token=orh6o', logo: 'http://epg.it999.ru/img2/18.png' },
                    { name: 'СТС', url: 'http://flu.ttk.mx:9090/STS/index.m3u8?token=orh6o', logo: 'http://epg.it999.ru/img2/79.png' }
                ]
            },
            {
                title: '🌏 Познавательные',
                channels: [
                    { name: 'Глазами туриста', url: 'https://livetv.mylifeisgood.ml/channels/glazamiturista.m3u8', logo: 'http://epg.it999.ru/img2/2508.png' },
                    { name: 'Discovery HD', url: 'https://livetv.mylifeisgood.ml/channels/discovery.m3u8', logo: 'http://epg.it999.ru/img2/1612.png' }
                ]
            }
        ];

        this.create = function () {
            var _this = this;
            this.activity.loader(false);
            
            data_groups.forEach(function(group) {
                var line = $('<div class="items-line"><div class="items-line__title" style="margin: 1em 0 0.5em 1em; font-size: 1.5em; font-weight: bold;">'+group.title+'</div><div class="items-line__body"></div></div>');
                
                group.channels.forEach(function(channel) {
                    var item = Lampa.Template.get('card', {title: channel.name, release_year: ''});
                    item.find('.card__img').attr('src', channel.logo);
                    item.find('.card__view').remove();
                    
                    item.on('hover:enter', function () {
                        var video = { title: channel.name, url: channel.url };
                        Lampa.Player.play(video);
                        Lampa.Player.playlist([video]);
                    });
                    
                    line.find('.items-line__body').append(item);
                    items.push(item);
                });
                body.append(line);
            });
            scroll.append(body);
            html.append(scroll.render());
        };

        this.render = function () { return html; };
        this.destroy = function () {
            network.clear();
            scroll.destroy();
            html.remove();
            body.remove();
            items = [];
        };
    }

    function startPlugin() {
        if (!window.smart_tv_plugin_installed) {
            window.smart_tv_plugin_installed = true;
            
            // Регистрация компонента
            Lampa.Component.add('smart_tv', SmartTV_Plugin);

            // Функция добавления кнопки в меню
            var addMenuItem = function() {
                if ($('.menu .menu__list').length > 0 && !$('.menu__item[data-action="smart_tv"]').length) {
                    var menu_item = $('<li class="menu__item selector" data-action="smart_tv">' +
                        '<div class="menu__ico"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 7L12 3L3 7V17L12 21L21 17V7Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
                        '<div class="menu__text">Smart TV</div>' +
                        '</li>');

                    menu_item.on('hover:enter', function () {
                        Lampa.Activity.push({ title: 'Smart TV', component: 'smart_tv', page: 1 });
                    });

                    $('.menu .menu__list').append(menu_item);
                }
            };

            // Пытаемся добавить меню сразу и через интервал (на случай долгой загрузки)
            addMenuItem();
            var timer = setInterval(addMenuItem, 1000);
            setTimeout(function() { clearInterval(timer); }, 10000);
        }
    }

    if (window.appready) startPlugin();
    else Lampa.Listener.follow('app', function (e) { if (e.type == 'ready') startPlugin(); });
})();