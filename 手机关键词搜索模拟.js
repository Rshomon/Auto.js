// 主要运行操作
function keywords(data) {
  log("进入搜索执行函数")
  sleep(3000);
  var x = id("bky").findOnce();
  if (x != null) {
    x.click();
    log("已取消");
  }
  var 暂时不用 = id("tk").findOnce();
  if (暂时不用 != null) {
    暂时不用.click();
    log("暂时不用");
  }
  while (!click("推荐")) {}
  sleep(500);
  // while (!click("关注")) {}
  var searchkeywords = data.searchkeywords;
  var title = data.title;
  for (i in searchkeywords) {
    // console.show();
    if (id("ctb").findOnce() == null) {
      log("右上角不存在，点击长条");
      id("aun").findOne().click();
    }
    if (id("aun").findOnce() == null) {
      log("长条不存在，点击右上角");
      id("ctb").findOne().click();
    }
    sleep(500);
    var search = id("bpv").findOne();
    if (search) {
      search.click();
      setText(searchkeywords[i]);
      toast("suc");
    }
    // 点击搜索按钮
    var searchbtn = id("bpy").findOne();
    if (searchbtn) {
      searchbtn.click();
      sleep(500);
    }

    //   var zuixin = text("英文阅读器").findOne();
    var zuixin = className("android.widget.TextView").text("最新").findOne();
    if (zuixin) {
      click("最新");
      sleep(1000);
    }

    while (true) {
      while (isClick(title)) {
        uproll();
        // 如果划到底部，返回三次，再次开始遍历
        var end = text("没有找到相关内容 换个词试试吧").findOnce();
        var end2 = text("- THE END -").findOnce();
        if (end != null || end2 != null) {
          log("已到文章末尾，返回继续执行");
          back();
          back();
          back();
          break;
        }
      }
      // 进入详情页
      detail_click();
    }
    console.hide();
  }
}
// 找到标题包含的关键词进入点击
function detail_click() {
  log("已找到目标关键词");
  uproll();
  sleep(500);
  id("c5d").findOne().click();
  sleep(500);
  uproll();
  sleep(500);
  id("c4c").findOne().click();
  uproll();
  uproll();
  back();
  uproll();
  uproll();
  uproll();
  uproll();
}
// 判断当前界面是否存在可点击
function isClick(result) {
  //   for (i in result) {
  //     !click(i);
  //   }
  var a = !click(result[0]);
  var i = 1;
  while (a) {
    var a = a && !click(result[i]);
    i++;
    if (i > result.length) {
      break;
    }
  }
  console.log("当前页可点击状态： ", !a);
  return a;
}
// 向上滑动
function uproll() {
  gesture(500, [300, 1000], [300, 300]);
}

// 网络请求关键词(---------)本机测试服务无法请求到，java的一些限制
// 需要将请求放在服务器中
function getSearchKeyWords() {}
// 执行程序
// 请求关键词
getSearchKeyWords();
// searchkeywords：搜索关键字
// title：目标点击的标题
// 下面的data为假数据，用来测试，用于项目中需要在getSearchKeyWords返回的数据
let data = {
  searchkeywords: ["英语阅读", "英语阅读APP", "英语阅读绘本"],
  title: ["这款儿童英语阅读APP", "双非一本逆袭帝都985"],
};

// 判断是否登录成功
var appPackge = "com.xingin.xhs";
console.show();
// 判断是否打开辅助功能
auto.waitFor();
log("已打开辅助功能");
if (launchApp("小红书")) {
  log("打开小红书成功");
}
// 启动app之后休眠3s，等待app完全启动
sleep(7000);
if (text("同意").findOnce() != null) {
  // 如果屏幕上存在同意，执行登录函数
  login();
  keywords(data)
} else {
  if (text("推荐").findOnce() != null) {
    log("登录成功！");
    log("开始关键词搜索");
    keywords(data);
  } else {
    log("不在APP主页，不执行，强制关闭");
    sleep(2000);
    closedApp();
    sleep(1000);
    if (launchApp("小红书")) {
      log("打开小红书成功");
    }
    sleep(8000);
    if (text("微博").findOnce() != null) {
      log("开始执行登录操作");
      login();
      log("登录操作执行完成，开始搜索");
      keywords(data);
    } else {
      // while (!click("关注")) {}
      sleep(3000);
      if (text("关注").findOnce() != null) {
        log("登录成功！");
        log("开始关键词搜索");
        log("进入")
        keywords(data);
      } else {
        log("开始用户登录");
        login();
        keywords(data);
      }
    }
  }
}
// keywords(data);
// 强制关闭小红书App
function closedApp() {
  app.openAppSetting("com.xingin.xhs");
  sleep(1000);
  log(id("right_button").findOnce().click());
  id("button1").findOne().click();
}
// 登录函数
function login() {
  var appPackge = "com.xingin.xhs";
  console.show();
  // 判断是否打开辅助功能
  auto.waitFor();
  log("已打开辅助功能");
  // 杀死进程
  log("已结束进程", appPackge);
  if (launchApp("小红书")) {
    log("打开小红书成功");
  }
  sleep(2000);
  var agreed = text("同意").findOnce();
  if (agreed != null) {
    agreed.click();
    console.log("同意");
  }
  while (!click("微博")) {
    // console.log("未点击微博");
  }
  console.log("已点击微博");
  sleep(10000);
  while (!click("推荐")) {
    log("登录失败，再次输入");
    click(200, 560);
    setText([0], "17046374055");
    click(180, 560);
    setText([1], "su194489");
    sleep(1000);
    click(353, 618);
    sleep(5000);
  }

  // 判断是否登录成功
  log("登录成功！");
  log("开始关键词搜索");
  sleep(3000);
  // console.hide();
}
