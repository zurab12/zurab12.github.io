(function() {
  'use strict';

  window.lampac_version = {major: 149, minor: 1};

  localStorage.setItem('cub_mirrors', '["mirror-kurwa.men"]');
  
  window.lampa_settings = {
    torrents_use: true,
    demo: false,
    read_only: false,
    socket_use: true,
    socket_url: undefined,
    socket_methods: true,
    account_use: true,
    account_sync: true,
    plugins_store: true,
    iptv: false,
    feed: true,
    white_use: true,
    push_state: true,
    lang_use: true,
    plugins_use: true,
    dcma: false
  };

  window.lampa_settings.disable_features = {
    dmca: true,
    reactions: false,
    discuss: false,
    ai: false,
    install_proxy: false,
    subscribe: false,
    blacklist: false,
    persons: false,
    ads: true,
    trailers: false
  };
  
  
  // //////////////
// Переименуйте файл lampainit-invc.js в lampainit-invc.my.js
// //////////////


var lampainit_invc = {};


// Лампа готова для использования 
lampainit_invc.appload = function appload() {
  // Lampa.Utils.putScriptAsync(["http://192.168.10.37:11440/myplugin.js"]);  // wwwroot/myplugin.js
  // Lampa.Utils.putScriptAsync(["http://192.168.10.37:11440/plugins/ts-preload.js", "https://nb557.github.io/plugins/online_mod.js"]);
  // Lampa.Storage.set('proxy_tmdb', 'true');
  // etc
};


// Лампа полностью загружена, можно работать с интерфейсом 
lampainit_invc.appready = function appready() {
  // $('.head .notice--icon').remove();
};


// Выполняется один раз, когда пользователь впервые открывает лампу
lampainit_invc.first_initiale = function firstinitiale() {
  // Здесь можно указать/изменить первоначальные настройки 
  // Lampa.Storage.set('source', 'tmdb');
};


// Ниже код выполняется до загрузки лампы, например можно изменить настройки 
// window.lampa_settings.push_state = false;
// localStorage.setItem('cub_domain', 'mirror-kurwa.men');
// localStorage.setItem('cub_mirrors', '["mirror-kurwa.men"]');


/* Контекстное меню в online.js
window.lampac_online_context_menu = {
  push: function(menu, extra, params) {
    menu.push({
      title: 'TEST',
      test: true
    });
  },
  onSelect: function onSelect(a, params) {
    if (a.test)
      console.log(a);
  }
};
*/


  var timer = setInterval(function() {
    if (typeof Lampa !== 'undefined') {
      clearInterval(timer);
	  
      if (lampainit_invc)
        lampainit_invc.appload();

      if (true)
        Lampa.Storage.set('full_btn_priority', '1300029617');

      var unic_id = Lampa.Storage.get('lampac_unic_id', '');
      if (!unic_id) {
        unic_id = Lampa.Utils.uid(8).toLowerCase();
        Lampa.Storage.set('lampac_unic_id', unic_id);
      }

      Lampa.Utils.putScriptAsync(["http://192.168.10.37:11440/cubproxy.js", "http://192.168.10.37:11440/privateinit.js?account_email=" + encodeURIComponent(Lampa.Storage.get('account_email', '')) + "&uid=" + encodeURIComponent(Lampa.Storage.get('lampac_unic_id', ''))], function() {});

      if (window.appready) {
        start();
      }
      else {
        Lampa.Listener.follow('app', function(e) {
          if (e.type == 'ready') {
            start();
          }
        });
      }

	  Lampa.Lang.add({
  pirate_store: {
    ru: 'Плагины',
    en: 'Plugins',
    uk: 'Додатки',
    zh: '插件'
  }
});

function addStore() {
  if (Lampa.Settings.main && !Lampa.Settings.main().render().find('[data-component="pirate_store"]').length) {
    var field = $(Lampa.Lang.translate("<div class=\"settings-folder selector\" data-component=\"pirate_store\" data-static=\"true\">\n\t\t\t<div class=\"settings-folder__icon\">\n\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"512\" height=\"512\" x=\"0\" y=\"0\" viewBox=\"0 0 490 490\" xml:space=\"preserve\"><path d=\"M153.125 317.435h183.75v30.625h-183.75z\" fill=\"white\"></path><circle cx=\"339.672\" cy=\"175.293\" r=\"42.642\" fill=\"white\"></circle><path d=\"M420.914 0H69.086C30.999 0 0 30.999 0 69.086v351.829C0 459.001 30.999 490 69.086 490h351.829C459.001 490 490 459.001 490 420.914V69.086C490 30.999 459.001 0 420.914 0zM69.086 30.625h237.883c-17.146 20.912-42.277 47.893-75.177 74.575-9.514-12.906-26.35-19.331-42.586-14.613l-69.644 20.242c-20.778 6.039-32.837 27.98-26.798 48.758l6.475 22.278c-21.375 8-44.353 14.456-68.614 19.267V69.086c0-21.204 17.257-38.461 38.461-38.461zm390.289 390.289c0 21.204-17.257 38.461-38.461 38.461H69.086c-21.204 0-38.461-17.257-38.461-38.461V232.459c27.504-4.993 53.269-12.075 77.268-20.816l3.811 13.111c6.038 20.778 27.98 32.837 48.758 26.799l69.643-20.242c20.778-6.039 32.837-27.98 26.799-48.758l-13.481-46.382c50.532-39.47 84.67-80.759 102.687-105.546h74.805c21.204 0 38.461 17.257 38.461 38.461v351.828z\" fill=\"white\"></path></svg>\n\t\t\t</div>\n\t\t\t<div class=\"settings-folder__name\">"+Lampa.Lang.translate('pirate_store')+"</div>\n\t\t</div>"));
    Lampa.Settings.main().render().find('[data-component="more"]').after(field);
    Lampa.Settings.main().update();
  }
}
Lampa.Settings.listener.follow('open', function(e) {
  if (e.name == 'main') {
    e.body.find('[data-component="pirate_store"]').on('hover:enter', function() {
      Lampa.Extensions.show({
        store: 'https://zurab12.github.io/extensions',
        with_installed: true
      });
    });
  }
});
if (window.appready) addStore();
else {
  Lampa.Listener.follow('app', function(e) {
    if (e.type == 'ready') addStore();
  });
}

    }
  }, 200);

  function start() {
    
	
    if (lampainit_invc) lampainit_invc.appready();
    if (Lampa.Storage.get('lampac_initiale', 'false')) return;

    Lampa.Storage.set('lampac_initiale', 'true');
    Lampa.Storage.set('source', 'cub');
    Lampa.Storage.set('video_quality_default', '2160');
    Lampa.Storage.set('full_btn_priority', '1300029617');
    Lampa.Storage.set('proxy_tmdb', '' == 'RU');
    Lampa.Storage.set('poster_size', 'w300');

    Lampa.Storage.set('parser_use', 'true');
    Lampa.Storage.set('jackett_url', '192.168.10.37:11440');
    Lampa.Storage.set('jackett_key', '1');
    Lampa.Storage.set('parser_torrent_type', 'jackett');

    var plugins = Lampa.Plugins.get();

    var plugins_add = [{"url": "https://zurab12.github.io/start.js","status": 1,"name": "Start","author": "lampac"},{"url": "https://zurab12.github.io/tracks.js","status": 1,"name": "Tracks.js","author": "lampac"},{"url": "https://zurab12.github.io/t.js","status": 1,"name": "TMDB Proxy","author": "lampac"},{"url": "https://zurab12.github.io/online.js","status": 1,"name": "Онлайн","author": "lampac"},{"url": "https://zurab12.github.io/catalog.js","status": 1,"name": "Альтернативные источники каталога","author": "lampac"},{"url": "https://zurab12.github.io/sisi.js","status": 1,"name": "Клубничка","author": "lampac"},{"url": "https://zurab12.github.io/startpage.js","status": 1,"name": "Стартовая страница","author": "lampac"},{"url": "https://zurab12.github.io/sync.js","status": 1,"name": "Синхронизация","author": "lampac"},{"url": "https://zurab12.github.io/ts.js","status": 1,"name": "TorrServer","author": "lampac"},{"url": "https://zurab12.github.io/backup.js","status": 1,"name": "Backup","author": "lampac"}];

    var plugins_push = [];

    plugins_add.forEach(function(plugin) {
      if (!plugins.find(function(a) {
          return a.url == plugin.url;
        })) {
        Lampa.Plugins.add(plugin);
        Lampa.Plugins.save();

        plugins_push.push(plugin.url);
      }
    });

    if (plugins_push.length) Lampa.Utils.putScript(plugins_push, function() {}, function() {}, function() {}, true);
	
    if (lampainit_invc)
      lampainit_invc.first_initiale();

  }
})();