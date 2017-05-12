

function CheckPassword(inputtxt)
{
    var passw=  /^[A-Za-z]\w{7,30}$/;
    if(inputtxt.value.match(passw))
    {
        alert('Correct, try another...')
        return true;
    }
    else
    {
        alert('Wrong...!')
        return false;
    }
}