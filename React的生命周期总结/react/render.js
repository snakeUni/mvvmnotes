/**
 * react render渲染的过程调用的函数依次为
 * render 无论是render还是hydrate,unstable_renderSubtreeIntoContainer, unmountComponentAtNode 
 * 他们都是legacyRenderSubtreeIntoContainer的加壳方法，都是对这个方法的调用
 * render 调用legacyCreateRootFromDOMContainer生成一个ReactRoot对象，然后又在里面调用了render和其他的方法
 * ReactRoot里面调用了DOMRenderer.updateContainerAtExpirationTime方法，
 * updateContainerAtExpirationTime里面又调用了scheduleRootUpdate
 * scheduleRootUpdate调用了scheduleWork，在到调用了requestWork
 *
 * ------------------------ *
 * scheduleDeferredCallback 是什么？看一下源码
 * scheduleDeferredCallback: rIC
 * 那么 rIC又是什么
 * rIC是很出名的window.requestIdleCallback(),具体怎么用可以查看Mdn文档
 * 根据输出的顺序可以看出同步调用走到了performSyncWork,那么这个函数又调用了
 * performWork,performSyncWork和performAsyncWork都调用了performWork
 * 
 */