function n(a)
{
    var m = 0;
    for (var i in a)
    {
        if (a[i].constructor.name == "Array")
        {
            m += n(a[i]);
            continue;
        }
        m++;
    }
    return m;
}

export default n;