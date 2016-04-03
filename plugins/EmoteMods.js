//META{"name":"EmoteMods"}*//
function EmoteMods() {}
EmoteMods.prototype.getName = function() {
    return "EmoteMods";
};
EmoteMods.prototype.getDescription = function() {
    return "Adds more emote mods!";
};
EmoteMods.prototype.getVersion = function() {
    return "1.1";
};
EmoteMods.prototype.getAuthor = function() {
    return "TeamGameRevolution";
};
EmoteMods.prototype.getSettingsPanel = function() {
    return '';
};

EmoteMods.prototype.load = function() {
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " loaded.", "color: purple; font-weight: bold;", "");
};

EmoteMods.prototype.unload = function() {
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + "unloaded.", "color: purple; font-weight: bold;", "");
};

EmoteMods.prototype.start = function() {
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " started.", "color: purple; font-weight: bold;", "");
    EmoteModule.prototype.injectEmote = function(node) {

        if (typeof emotesTwitch === 'undefined') return;

        if (!node.parentElement) return;

        var parent = node.parentElement;

        if (parent.tagName != "SPAN") return;
        if (!$(parent.parentElement).hasClass("markup") && !$(parent.parentElement).hasClass("message-content")) {
            return;
        }


        var edited = false;

        if ($(parent.parentElement).hasClass("edited")) {
            parent = parent.parentElement.parentElement.firstChild; //:D
            edited = true;
        }

        //if(!$(parent.parentElement).hasClass("markup") && !$(parent.parentElement).hasClass("message-content")) return;

        function inject() {
            var parentInnerHTML = parent.innerHTML;
            var words = parentInnerHTML.split(/\s+/g);

            if (!words) return;

            words.some(function(word) {
                if (word.slice(0, 4) == "[!s]") {

                    parentInnerHTML = parentInnerHTML.replace("[!s]", "");
                    var markup = $(parent).parent();
                    var reactId = markup.attr("data-reactid");

                    if (spoilered.indexOf(reactId) > -1) {
                        return;
                    }

                    markup.addClass("spoiler");
                    markup.on("click", function() {
                        $(this).removeClass("spoiler");
                        spoilered.push($(this).attr("data-reactid"));
                    });

                    return;
                }

                if (word.length < 4) {
                    return;
                }

                if (word == "ClauZ") {
                    parentInnerHTML = parentInnerHTML.replace("ClauZ", '<img src="https://cdn.frankerfacez.com/emoticon/70852/1" style="width:25px; transform:translate(-29px, -14px);"></img>');
                    return;
                }

                if ($.inArray(word, bemotes) != -1) return;

                var useEmoteCss = false;
                var sWord = word;
                var emoteClass = "";
                var allowedClasses = ["emoteflip", "emotespin", "emotepulse", "emotespinflip", "emotespin2", "emotespin3", "emoterainbow"];
                if (word.indexOf(":") > -1) {
                    userEmoteCss = true;
                    sWord = word.split(":")[0];
                    if (settingsCookie["bda-es-8"]) {
                        for (var i = 0; i < word.split(":")[1].split(",").length; i++) {
                            emoteClass = emoteClass + "emote" + word.split(":")[1].split(",")[i] + " ";
                            if (allowedClasses.indexOf("emote" + word.split(":")[1].split(",")[i]) < 0) {
                                emoteClass = "";
                            }
                        }
                    }
                }

                if (emotesTwitch.emotes.hasOwnProperty(sWord)) {
                    var len = Math.round(sWord.length / 4);
                    var name = sWord.substr(0, len) + "\uFDD9" + sWord.substr(len, len) + "\uFDD9" + sWord.substr(len * 2, len) + "\uFDD9" + sWord.substr(len * 3);
                    var url = twitchEmoteUrlStart + emotesTwitch.emotes[sWord].image_id + twitchEmoteUrlEnd;
                    parentInnerHTML = parentInnerHTML.replace(word, '<div class="emotewrapper"><img class="emote ' + emoteClass + '" alt="' + name + '" src="' + url + '"/><input onclick=\'quickEmoteMenu.favorite(\"' + name + '\", \"' + url + '\");\' class="fav" title="Favorite!" type="button"></div>');
                    return;
                }

                if (subEmotesTwitch.hasOwnProperty(sWord)) {
                    var len = Math.round(sWord.length / 4);
                    var name = sWord.substr(0, len) + "\uFDD9" + sWord.substr(len, len) + "\uFDD9" + sWord.substr(len * 2, len) + "\uFDD9" + sWord.substr(len * 3);
                    var url = twitchEmoteUrlStart + subEmotesTwitch[sWord] + twitchEmoteUrlEnd;
                    parentInnerHTML = parentInnerHTML.replace(word, '<div class="emotewrapper"><img class="emote ' + emoteClass + '" alt="' + name + '" src="' + url + '"/><input onclick=\'quickEmoteMenu.favorite(\"' + name + '\", \"' + url + '\");\' class="fav" title="Favorite!" type="button"></div>');
                    return;
                }

                if (typeof emotesFfz !== 'undefined' && settingsCookie["bda-es-1"]) {
                    if (emotesFfz.hasOwnProperty(sWord)) {
                        var len = Math.round(sWord.length / 4);
                        var name = sWord.substr(0, len) + "\uFDD9" + sWord.substr(len, len) + "\uFDD9" + sWord.substr(len * 2, len) + "\uFDD9" + sWord.substr(len * 3);
                        var url = ffzEmoteUrlStart + emotesFfz[sWord] + ffzEmoteUrlEnd;
                        parentInnerHTML = parentInnerHTML.replace(word, '<div class="emotewrapper"><img class="emote ' + emoteClass + '" alt="' + name + '" src="' + url + '"/><input onclick=\'quickEmoteMenu.favorite(\"' + name + '\", \"' + url + '\");\' class="fav" title="Favorite!" type="button"></div>');
                        return;
                    }
                }

                if (typeof emotesBTTV !== 'undefined' && settingsCookie["bda-es-2"]) {
                    if (emotesBTTV.hasOwnProperty(sWord)) {
                        var len = Math.round(sWord.length / 4);
                        var name = sWord.substr(0, len) + "\uFDD9" + sWord.substr(len, len) + "\uFDD9" + sWord.substr(len * 2, len) + "\uFDD9" + sWord.substr(len * 3);
                        var url = emotesBTTV[sWord];
                        parentInnerHTML = parentInnerHTML.replace(word, '<div class="emotewrapper"><img class="emote ' + emoteClass + '" alt="' + name + '" src="' + url + '"/><input onclick=\'quickEmoteMenu.favorite(\"' + name + '\", \"' + url + '\");\' class="fav" title="Favorite!" type="button"></div>');
                        return;
                    }
                }

                if (typeof emotesBTTV2 !== 'undefined' && settingsCookie["bda-es-2"]) {
                    if (emotesBTTV2.hasOwnProperty(sWord)) {
                        var len = Math.round(sWord.length / 4);
                        var name = sWord.substr(0, len) + "\uFDD9" + sWord.substr(len, len) + "\uFDD9" + sWord.substr(len * 2, len) + "\uFDD9" + sWord.substr(len * 3);
                        var url = bttvEmoteUrlStart + emotesBTTV2[sWord] + bttvEmoteUrlEnd;
                        parentInnerHTML = parentInnerHTML.replace(word, '<div class="emotewrapper"><img class="emote ' + emoteClass + '" alt="' + name + '" src="' + url + '"/><input onclick=\'quickEmoteMenu.favorite(\"' + name + '\", \"' + url + '\");\' class="fav" title="Favorite!" type="button"></div>');
                        return;
                    }
                }

            });

            if (parent.parentElement == null) return;

            var oldHeight = parent.parentElement.offsetHeight;
            parent.innerHTML = parentInnerHTML.replace(new RegExp("\uFDD9", "g"), "");
            var newHeight = parent.parentElement.offsetHeight;

            //Scrollfix
            var scrollPane = $(".scroller.messages").first();
            scrollPane.scrollTop(scrollPane.scrollTop() + (newHeight - oldHeight));
        }

        if (edited) {
            setTimeout(inject, 250);
        } else {
            inject();
        }

    };

    BdApi.injectCSS('emotemodsplugin', '.emoterainbow { animation: colorchange infinite 1s; -webkit-animation: colorchange infinite 1s; } @keyframes colorchange { 0% {-webkit-filter: sepia(100%);} 25% {-webkit-filter: sepia(100%) hue-rotate(90deg);} 50% {-webkit-filter: sepia(100%) hue-rotate(180deg);} 75% {-webkit-filter: sepia(100%) hue-rotate(270deg);} 100% {-webkit-filter: sepia(100%) hue-rotate(360deg);} } @-webkit-keyframes colorchange /* Safari and Chrome - necessary duplicate */ { 0% {-webkit-filter: sepia(100%);} 25% {-webkit-filter: sepia(100%) hue-rotate(90deg);} 50% {-webkit-filter: sepia(100%) hue-rotate(180deg);} 75% {-webkit-filter: sepia(100%) hue-rotate(270deg);} 100% {-webkit-filter: sepia(100%) hue-rotate(360deg);} }');
};

EmoteMods.prototype.stop = function() {
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " stopped.", "color: purple; font-weight: bold;", "");
    EmoteModule.prototype.injectEmote = function(node) {

        if (typeof emotesTwitch === 'undefined') return;

        if (!node.parentElement) return;

        var parent = node.parentElement;

        if (parent.tagName != "SPAN") return;
        if (!$(parent.parentElement).hasClass("markup") && !$(parent.parentElement).hasClass("message-content")) {
            return;
        }


        var edited = false;

        if ($(parent.parentElement).hasClass("edited")) {
            parent = parent.parentElement.parentElement.firstChild; //:D
            edited = true;
        }

        //if(!$(parent.parentElement).hasClass("markup") && !$(parent.parentElement).hasClass("message-content")) return;

        function inject() {
            var parentInnerHTML = parent.innerHTML;
            var words = parentInnerHTML.split(/\s+/g);

            if (!words) return;

            words.some(function(word) {
                if (word.slice(0, 4) == "[!s]") {

                    parentInnerHTML = parentInnerHTML.replace("[!s]", "");
                    var markup = $(parent).parent();
                    var reactId = markup.attr("data-reactid");

                    if (spoilered.indexOf(reactId) > -1) {
                        return;
                    }

                    markup.addClass("spoiler");
                    markup.on("click", function() {
                        $(this).removeClass("spoiler");
                        spoilered.push($(this).attr("data-reactid"));
                    });

                    return;
                }

                if (word.length < 4) {
                    return;
                }

                if (word == "ClauZ") {
                    parentInnerHTML = parentInnerHTML.replace("ClauZ", '<img src="https://cdn.frankerfacez.com/emoticon/70852/1" style="width:25px; transform:translate(-29px, -14px);"></img>');
                    return;
                }

                if ($.inArray(word, bemotes) != -1) return;

                var useEmoteCss = false;
                var sWord = word;
                var emoteClass = "";
                var allowedClasses = ["emoteflip", "emotespin", "emotepulse", "emotespinflip", "emotespin2", "emotespin3"];
                if (word.indexOf(":") > -1) {
                    userEmoteCss = true;
                    sWord = word.split(":")[0];
                    if (settingsCookie["bda-es-8"]) {
                        emoteClass = "emote" + word.split(":")[1];
                        if (allowedClasses.indexOf(emoteClass) < 0) {
                            emoteClass = "";
                        }
                    }
                }

                if (emotesTwitch.emotes.hasOwnProperty(sWord)) {
                    var len = Math.round(sWord.length / 4);
                    var name = sWord.substr(0, len) + "\uFDD9" + sWord.substr(len, len) + "\uFDD9" + sWord.substr(len * 2, len) + "\uFDD9" + sWord.substr(len * 3);
                    var url = twitchEmoteUrlStart + emotesTwitch.emotes[sWord].image_id + twitchEmoteUrlEnd;
                    parentInnerHTML = parentInnerHTML.replace(word, '<div class="emotewrapper"><img class="emote ' + emoteClass + '" alt="' + name + '" src="' + url + '"/><input onclick=\'quickEmoteMenu.favorite(\"' + name + '\", \"' + url + '\");\' class="fav" title="Favorite!" type="button"></div>');
                    return;
                }

                if (subEmotesTwitch.hasOwnProperty(sWord)) {
                    var len = Math.round(sWord.length / 4);
                    var name = sWord.substr(0, len) + "\uFDD9" + sWord.substr(len, len) + "\uFDD9" + sWord.substr(len * 2, len) + "\uFDD9" + sWord.substr(len * 3);
                    var url = twitchEmoteUrlStart + subEmotesTwitch[sWord] + twitchEmoteUrlEnd;
                    parentInnerHTML = parentInnerHTML.replace(word, '<div class="emotewrapper"><img class="emote ' + emoteClass + '" alt="' + name + '" src="' + url + '"/><input onclick=\'quickEmoteMenu.favorite(\"' + name + '\", \"' + url + '\");\' class="fav" title="Favorite!" type="button"></div>');
                    return;
                }

                if (typeof emotesFfz !== 'undefined' && settingsCookie["bda-es-1"]) {
                    if (emotesFfz.hasOwnProperty(sWord)) {
                        var len = Math.round(sWord.length / 4);
                        var name = sWord.substr(0, len) + "\uFDD9" + sWord.substr(len, len) + "\uFDD9" + sWord.substr(len * 2, len) + "\uFDD9" + sWord.substr(len * 3);
                        var url = ffzEmoteUrlStart + emotesFfz[sWord] + ffzEmoteUrlEnd;
                        parentInnerHTML = parentInnerHTML.replace(word, '<div class="emotewrapper"><img class="emote ' + emoteClass + '" alt="' + name + '" src="' + url + '"/><input onclick=\'quickEmoteMenu.favorite(\"' + name + '\", \"' + url + '\");\' class="fav" title="Favorite!" type="button"></div>');
                        return;
                    }
                }

                if (typeof emotesBTTV !== 'undefined' && settingsCookie["bda-es-2"]) {
                    if (emotesBTTV.hasOwnProperty(sWord)) {
                        var len = Math.round(sWord.length / 4);
                        var name = sWord.substr(0, len) + "\uFDD9" + sWord.substr(len, len) + "\uFDD9" + sWord.substr(len * 2, len) + "\uFDD9" + sWord.substr(len * 3);
                        var url = emotesBTTV[sWord];
                        parentInnerHTML = parentInnerHTML.replace(word, '<div class="emotewrapper"><img class="emote ' + emoteClass + '" alt="' + name + '" src="' + url + '"/><input onclick=\'quickEmoteMenu.favorite(\"' + name + '\", \"' + url + '\");\' class="fav" title="Favorite!" type="button"></div>');
                        return;
                    }
                }

                if (typeof emotesBTTV2 !== 'undefined' && settingsCookie["bda-es-2"]) {
                    if (emotesBTTV2.hasOwnProperty(sWord)) {
                        var len = Math.round(sWord.length / 4);
                        var name = sWord.substr(0, len) + "\uFDD9" + sWord.substr(len, len) + "\uFDD9" + sWord.substr(len * 2, len) + "\uFDD9" + sWord.substr(len * 3);
                        var url = bttvEmoteUrlStart + emotesBTTV2[sWord] + bttvEmoteUrlEnd;
                        parentInnerHTML = parentInnerHTML.replace(word, '<div class="emotewrapper"><img class="emote ' + emoteClass + '" alt="' + name + '" src="' + url + '"/><input onclick=\'quickEmoteMenu.favorite(\"' + name + '\", \"' + url + '\");\' class="fav" title="Favorite!" type="button"></div>');
                        return;
                    }
                }

            });

            if (parent.parentElement == null) return;

            var oldHeight = parent.parentElement.offsetHeight;
            parent.innerHTML = parentInnerHTML.replace(new RegExp("\uFDD9", "g"), "");
            var newHeight = parent.parentElement.offsetHeight;

            //Scrollfix
            var scrollPane = $(".scroller.messages").first();
            scrollPane.scrollTop(scrollPane.scrollTop() + (newHeight - oldHeight));
        }

        if (edited) {
            setTimeout(inject, 250);
        } else {
            inject();
        }

    };
    BdApi.clearCSS('emotemodsplugin');
};

EmoteMods.prototype.onMessage = function() {
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " [onMessage] event fired.", "color: purple; font-weight: bold;", "");
};
EmoteMods.prototype.onSwitch = function() {
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " [onSwitch] event fired.", "color: purple; font-weight: bold;", "");
};
