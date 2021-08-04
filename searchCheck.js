export default (searchQuery, searchResultToCheck) =>
{
    if (searchQuery == "")
    {
        return true;
    }
    var q = searchQuery.toLowerCase();
    for (var r = 0; r < q.length; r++)
    {
        if ("qwertyuiopasdfghjklzxcvbnm".indexOf(q[r]) == -1)
        {
            q = q.replace(q[r], "");
            r--;
        }
    }
    var querySplit = q.split(" ");
    for (var i = 0; i < querySplit.length; i++)
    {
        if (querySplit[i] == "")
        {
            querySplit.splice(i, 1);
            i--;
        }
    }
    if (querySplit.length == 0)
    {
        return true;
    }
    var check = searchResultToCheck.toLowerCase();
    for (var t = 0; t < check.length; t++)
    {
        if ("qwertyuiopasdfghjklzxcvbnm".indexOf(check[t]) == -1)
        {
            check = check.replace(check[t], "");
            t--;
        }
    }
    for (var e in querySplit)
    {
        if (check.indexOf(querySplit[e]) == -1)
        {
            return false;
        }
    }
    return true;
}