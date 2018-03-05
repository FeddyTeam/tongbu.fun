// 从后台读取数据
var read = () => {
	var code = window.localStorage.code;
	if(!!code){
		// 和后台所要数据
		console.log("和后台要数据")
		$.get("read.php?code="+code, function(result){
			var res = JSON.parse(result);
			console.log(res)
			window.localStorage.content = res;
			$("#string").val(res);
		});
	}else{
		console.log("没有取字码")
	}
}
// 数据推送给后台
var sync = () => {
	// 数据内容
	var data = $("#string").val();
	if(data.length == 0){
		data = " "
	}
	// 取字码
	var code = window.localStorage.code;
	if(!!code){
		// 吧数据同步给后台
		$.get("sync.php?code="+code+"&content="+data, function(result){
			var res = JSON.parse(result);
			if(res == true){
				// 同步成功，更新本地数据库
				window.localStorage.content = data;
			}
		});
	}else{
		console.log('没有取字码')
	}
}
// 生成取字码
var generateCode = () => {
	$.get("generate-code.php", function(data){
		var code = JSON.parse(data);
		window.localStorage.code = code;
		$("#passcode").val(code)
		swal({
		  title: code,
		  text: "这是你的取字码，在任何设备上，只要输入取字码就能获取文字",
		  type: 'warning',
		  showCancelButton: false,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: '明白了！'
		}).then(function (result) {
		  if (result.value) {
		    swal(
		      '取字码会自动存储在本地',
		      '下次无需输入哦～',
		      'success'
		    )
		  }
		})
	});
}

// 更新页面数据
var renew = (string) => {
	$("#string").val(string);
}

// 新手引导
var firstHint = () => {
	console.log("first")
	hint1()
}

var hint1 = ()=>{
	$(".hint").hide()
	$(".btn").hide()
	$(".note").hide()
	$(".first_hint_cover").show()
	$(".hint1").show()
	$(".btn1").show()
	$(".btn2").show()
	$(".btn1").animate({top:'350px'});
	$(".btn2").animate({top:'350px'});
}

var hint2 = ()=>{
	$(".hint").hide()
	$(".btn").hide()
	$(".note").hide()

	$(".first_hint_cover").show()
	$(".hint2").show()
	$(".note1").show()
	$(".jiantou1").show()
	$(".btn3").show()

	$(".jiantou1").animate({top:'70px'});
	setTimeout(function(){
		$(".note1").animate({top:'50px'});
	},300)
	setTimeout(function(){
		$(".btn3").animate({top:'200px'});
	},500)
}

var hint3 = () => {
	$(".hint").hide()
	$(".btn").hide()
	$(".note").hide()

	$(".first_hint_cover").show()
	$(".hint3").show()
	$(".note2").show()
	$(".jiantou2").show()
	$(".btn4").show()

	$(".jiantou2").animate({bottom:'170px'});
	setTimeout(function(){
		$(".note2").animate({bottom:'350px'});
	},300)
	setTimeout(function(){
		$(".btn4").animate({bottom:'60px'});
	},500)
}

var hint4 = () => {
	$(".hint").hide()
	$(".btn").hide()
	$(".note").hide()

	$(".first_hint_cover").show()
	$(".hint4").show()
	$(".note3").show()
	$(".btn5").show()

	$(".note3").animate({bottom:'450px'});
	setTimeout(function(){
		$(".btn5").animate({bottom:'340px'});
	},250)
}

var closeHint = () =>{
	$(".hint").hide()
	$(".btn").hide()
	$(".note").hide()
	$(".first_hint_cover").hide()

}


// ready
$(document).ready(function(){
	// 先给取字码输入框绑定事件，意思是无论什么时候，只要取字码变了，就按照取字码读取
	$("#passcode").change(function(){
		var new_code = $("#passcode").val()
		window.localStorage.code = new_code;
		read()
	})
	// 然后检查本地是否有取字码
	var code = window.localStorage.code;
	if(!!code){
		// 有取字码，就说明是老用户
		$("#passcode").val(code)
		read()
	}else{
		// 新用户写下要同步的文字再要取字码
		firstHint()
	}
	setInterval(function(){
		checkChanged();
	},3000)
})

// 检查用户输入的数据是否有变更，有的话就同步
var checkChanged = () => {
	// 从本地数据库掏出数据
	if(!!window.localStorage.content){
		var storage_cnt = window.localStorage.content;
	}else{
		var storage_cnt = "";
	}
	// 从用户输入掏出数据
	var current_cnt = $("#string").val();
	// 如果两个相等，什么都不做
	if(current_cnt == storage_cnt){
		console.log('the same')
	}else{
		console.log('not same');
		var code = window.localStorage.code;
		// 如果有取字码，说明是老用户
		if(!!code){
			sync()
		}else{
			// 如果没有取字码，但是用户输入的数据变了，说明是新用户
			generateCode()
		}
	}
}
