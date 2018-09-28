/*
 React全局变量
*/
var IndeterminateComponent = 0; // Before we know whether it is functional or class
var FunctionalComponent = 1;
var ClassComponent = 2;
var HostRoot = 3; // Root of a host tree. Could be nested inside another node.
var HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
var HostComponent = 5;
var HostText = 6;



var Fragment = 10;
var Mode = 11;
var ContextConsumer = 12;
var ContextProvider = 13;
var ForwardRef = 14;
var Profiler = 15;
var TimeoutComponent = 16;


// Represents the current time in ms.
var originalStartTimeMs = now();
var mostRecentCurrentTime = msToExpirationTime(0);
var mostRecentCurrentTimeMs = originalStartTimeMs;

// Used to ensure computeUniqueAsyncExpiration is monotonically increases.
var lastUniqueAsyncExpiration = 0;

// Represents the expiration time that incoming updates should use. (If this
// is NoWork, use the default strategy: async updates in async mode, sync
// updates in sync mode.)
var expirationContext = NoWork;

var isWorking = false;

// The next work in progress fiber that we're currently working on.
var nextUnitOfWork = null;
var nextRoot = null;
// The time at which we're currently rendering work.
var nextRenderExpirationTime = NoWork;
var nextLatestTimeoutMs = -1;
var nextRenderIsExpired = false;

// The next fiber with an effect that we're currently committing.
var nextEffect = null;

var isCommitting$1 = false;

var isRootReadyForCommit = false;

var legacyErrorBoundariesThatAlreadyFailed = null;

// Used for performance tracking.
var interruptedBy = null;

var stashedWorkInProgressProperties = void 0;
var replayUnitOfWork = void 0;
var isReplayingFailedUnitOfWork = void 0;
var originalReplayError = void 0;
var rethrowOriginalError = void 0;

var NoWork = 0;
var Sync = 1;
var Never = MAX_SIGNED_31_BIT_INT;

var UNIT_SIZE = 10;
var MAGIC_NUMBER_OFFSET = 2;

/*
* FiberNode 结构
* tag 即为上面几个全局变量
* stateNode 对应的DOM或者instance
* return 父元素Fiber结构
* sibling 邻居节点Fiber结构
* alternate 当前节点Fiber的一个副本
*/
function FiberNode(tag, pendingProps, key, mode) {
  // Instance
  this.tag = tag; //节点类型
  this.key = key;
  this.type = null; //对应的组件，可以是fn,class
  this.stateNode = null; //对应的Dom或者instance

  // Fiber
  this.return = null; //父节点
  this.child = null; //子节点
  this.sibling = null; //邻居节点
  this.index = 0;

  this.ref = null;

  this.pendingProps = pendingProps; //待更新的props
  this.memoizedProps = null;  //旧的props
  this.updateQueue = null; //更新的队列
  this.memoizedState = null; //旧的state

  this.mode = mode;

  // Effects
  this.effectTag = NoEffect; //更新dom的类型
  this.nextEffect = null; //下一个更新操作

  this.firstEffect = null; //第一个更新操作
  this.lastEffect = null; //最后一个更新操作

  this.expirationTime = NoWork;

  this.alternate = null; //当前fiber的副本用于更新操作

  if (enableProfilerTimer) {
    this.selfBaseTime = 0;
    this.treeBaseTime = 0;
  }

  {
    this._debugID = debugCounter++;
    this._debugSource = null;
    this._debugOwner = null;
    this._debugIsCurrentlyTiming = false;
    if (!hasBadMapPolyfill && typeof Object.preventExtensions === 'function') {
      Object.preventExtensions(this);
    }
  }
}


scheduleDeferredCallback: rIC,
cancelDeferredCallback: cIC

// TODO: There's no way to cancel, because Fiber doesn't atm.
var rIC = void 0;
var cIC = void 0;

if (!ExecutionEnvironment_1.canUseDOM) {
  rIC = function (frameCallback) {
    return setTimeout(function () {
      frameCallback({
        timeRemaining: function () {
          return Infinity;
        },

        didTimeout: false
      });
    });
  };
  cIC = function (timeoutID) {
    clearTimeout(timeoutID);
  };
} else if (alwaysUseRequestIdleCallbackPolyfill || typeof requestIdleCallback !== 'function' || typeof cancelIdleCallback !== 'function') {
  // Polyfill requestIdleCallback and cancelIdleCallback
} else {
  rIC = window.requestIdleCallback;
  cIC = window.cancelIdleCallback;
}

















































