var inputIndex = 0
var proStyle = 2 //题型
var inputArr = $('input')
var myarrAnsArr = [];
var answer = []
var time=0
var selectAnswer = [] //选择题答案

if (proStyle == 2) {
	for (var i = 0; i < inputArr.length; i++) {
		if (i != 0) {
			$(inputArr[i]).attr('disabled', 'true')
			$(inputArr[i]).css('background-color', '#ccc')
		}
	}
}

$('.answer').click(function() {
	if (proStyle == 3) {
		console.log($(this).val())
		if ($(this).hasClass('correct')) {
			$(this).removeClass('correct')
			selectAnswer.splice(selectAnswer.indexOf($(this).val()), 1)
		} else {
			$(this).addClass('correct')
			selectAnswer.push($(this).val())
		}
		selectAnswer.sort()
		console.log(selectAnswer)
	} else if (proStyle == 0 || proStyle == 1) {
		if ($(this).parent('p').siblings('p').children().hasClass('correct')) {
			$(this).parent('p').siblings('p').children().removeClass('correct')
			$(this).addClass('correct')
		} else {
			$(this).addClass('correct')
		}
		console.log()
		selectAnswer = $(this).addClass('correct').val()
	}

})

function submitFn() {
	clearInterval(timeType)
	if (proStyle == 3) {
		var answerType = ''
		for (var i in selectAnswer) {
			answerType += selectAnswer[i]
		}
		if (answerType == myarr[0]) {
			console.log('多选题正确')
		} else {
			console.log('多选题错误')
		}
	} else if (proStyle == 0 || proStyle == 1) {
		if (selectAnswer == myarr[0]) {
			console.log('判断正确')
		} else {
			console.log('判断题错误')
		}
	} else if (proStyle == 2) {
		if ($(inputArr[inputIndex]).val() == '') {
			return alert('请输入答案!')
		}
		if ($(inputArr[inputIndex + 1]).val() == '') { //有题
			$(inputArr[inputIndex]).attr('disabled', 'true')
			$(inputArr[inputIndex]).css('background-color', '#ccc')
			$(inputArr[inputIndex + 1]).removeAttr('disabled')
			$(inputArr[inputIndex + 1]).css('background-color', '#fff')
			OnBlanksSubmit(inputIndex, $(inputArr[inputIndex]).val(),1);
			inputIndex = inputIndex + 1
			console.log('还有题')
			return
		} else { //最后一道
			console.log('最后一道题,没题了')
			OnBlanksSubmit(inputIndex, $(inputArr[inputIndex]).val(),2);
		}
	}
}

function OnBlanksSubmit(index, answerVal,type) {
	clearInterval(timeType)
	console.log(myarrAns) //答案
	console.log(myarrAsk) //几个答案
	console.log(index, answerVal) //第几空和输入的答案
	var answerType = 0
	
	if (myarrAsk[index] == 1) {
		myarrAns[index] = myarrAns[index].split("|");
		if (myarrAns[index].length > 1) { //一空多个答案
			for (var i = 0; i < myarrAns[index].length; i++) {
				if (myarrAns[index].indexOf(answerVal) != -1) {
					console.log('第' + index + '多个答案正确')
					answerType = 1
					break
				} else {
					console.log('第' + index + '多个答案错误')
				}
			}
		} else { //一空一个答案
			if (myarrAns[index] == answerVal) {
				answerType = 1
				console.log('第' + index + '正确')
			} else {
				answerType = 0
				console.log('第' + index + '错误')
			}
		}
		parent.parentSubmit(answerType,type)
	} else {
		if (myarrAnsArr.length <= 0) {
			myarrAnsArr = myarrAns[0].split('|')
		}
		for (var i = 0; i < myarrAnsArr.length; i++) {
			if (myarrAnsArr[i] == answerVal) {
				answer.push(answerVal)
				myarrAnsArr.splice(i, 1)
				answerType = 1
				console.log('有正确答案', answer, myarrAnsArr)
				break
			}
		}
		parent.parentSubmit(answerType,type)
		// if (answerType == 1) {
		// 	parent.parentSubmit('1',type)
		// 	console.log('答对了！！')
		// } else {
		// 	parent.parentSubmit('0',type)
		// 	console.log('答错了！！')
		// }

	}
}

var timeType=setInterval(()=>{
	time++
	console.log(time)
}, 1000);
