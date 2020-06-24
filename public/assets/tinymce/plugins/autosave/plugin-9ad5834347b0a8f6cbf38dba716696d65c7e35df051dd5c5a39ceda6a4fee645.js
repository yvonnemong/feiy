!function(){"use strict";var a=function(t){var e=t,n=function(){return e};return{get:n,set:function(t){e=t},clone:function(){return a(n())}}},t=tinymce.util.Tools.resolve("tinymce.PluginManager"),r=tinymce.util.Tools.resolve("tinymce.util.LocalStorage"),o=tinymce.util.Tools.resolve("tinymce.util.Tools"),i=function(t,e){var n=t||e,r=/^(\d+)([ms]?)$/.exec(""+n);return(r[2]?{s:1e3,m:6e4}[r[2]]:1)*parseInt(n,10)},u=function(t){var e=t.getParam("autosave_prefix","tinymce-autosave-{path}{query}{hash}-{id}-");return e=(e=(e=(e=e.replace(/\{path\}/g,document.location.pathname)).replace(/\{query\}/g,document.location.search)).replace(/\{hash\}/g,document.location.hash)).replace(/\{id\}/g,t.id)},s=function(t,e){var n=t.settings.forced_root_block;return""===(e=o.trim(void 0===e?t.getBody().innerHTML:e))||new RegExp("^<"+n+"[^>]*>((\xa0|&nbsp;|[ \t]|<br[^>]*>)+?|)</"+n+">|<br>$","i").test(e)},c=function(t){var e=parseInt(r.getItem(u(t)+"time"),10)||0;return!((new Date).getTime()-e>i(t.settings.autosave_retention,"20m")&&(f(t,!1),1))},f=function(t,e){var n=u(t);r.removeItem(n+"draft"),r.removeItem(n+"time"),!1!==e&&t.fire("RemoveDraft")},l=function(t){var e=u(t);!s(t)&&t.isDirty()&&(r.setItem(e+"draft",t.getContent({format:"raw",no_events:!0})),r.setItem(e+"time",(new Date).getTime().toString()),t.fire("StoreDraft"))},m=function(t){var e=u(t);c(t)&&(t.setContent(r.getItem(e+"draft"),{format:"raw"}),t.fire("RestoreDraft"))},v=function(t,e){var n=i(t.settings.autosave_interval,"30s");e.get()||(setInterval(function(){t.removed||l(t)},n),e.set(!0))},d=function(t){t.undoManager.transact(function(){m(t),f(t)}),t.focus()};function g(r){for(var o=[],t=1;t<arguments.length;t++)o[t-1]=arguments[t];return function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n=o.concat(t);return r.apply(null,n)}}var y=tinymce.util.Tools.resolve("tinymce.EditorManager");y._beforeUnloadHandler=function(){var e;return o.each(y.get(),function(t){t.plugins.autosave&&t.plugins.autosave.storeDraft(),!e&&t.isDirty()&&t.getParam("autosave_ask_before_unload",!0)&&(e=t.translate("You have unsaved changes are you sure you want to navigate away?"))}),e};var p=function(n,r){return function(t){var e=t.control;e.disabled(!c(n)),n.on("StoreDraft RestoreDraft RemoveDraft",function(){e.disabled(!c(n))}),v(n,r)}};t.add("autosave",function(t){var e,n,r,o=a(!1);return window.onbeforeunload=y._beforeUnloadHandler,n=o,(e=t).addButton("restoredraft",{title:"Restore last draft",onclick:function(){d(e)},onPostRender:p(e,n)}),e.addMenuItem("restoredraft",{text:"Restore last draft",onclick:function(){d(e)},onPostRender:p(e,n),context:"file"}),t.on("init",function(){t.getParam("autosave_restore_when_empty",!1)&&t.dom.isEmpty(t.getBody())&&m(t)}),{hasDraft:g(c,r=t),storeDraft:g(l,r),restoreDraft:g(m,r),removeDraft:g(f,r),isEmpty:g(s,r)}})}();