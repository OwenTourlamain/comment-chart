# comment-chart

# Structure Plan

```
------------------------------------
Frontend    React    -> React Charts
                     get |   ^
------------------------------------
                         v   | return
Backend     Python 3 -> FastAPI <- tests (pytest?)
                           ^
                           v
                       data class
                           ^
                           v
                       sqlite3 db
```