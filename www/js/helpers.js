function ValidatePassKey(tb) {
	if (tb.TextLength >= 4) {
		document.getElementById(tb.id + 1).focus();
	}
}