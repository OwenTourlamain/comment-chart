import sqlite3

class DataPoint():

    def __init__(self, x, y, comment_count):
        self.x = x
        self.y = y
        self.comment_count = comment_count

    def __eq__(self, other):
        return (
            self.x == other.x 
        and
            self.y == other.y 
        and
            self.comment_count == other.comment_count
        )

class Comment():
    
    def __init__(self, id, username, text, datapoint):
        self.id = id
        self.username = username
        self.text = text
        self.datapoint = datapoint

    def __eq__(self, other):
        return (
            self.id == other.id 
        and
            self.username == other.username 
        and
            self.text == other.text
        and
            self.datapoint == other.datapoint
        )

class DB():

    def __init__(self):
        self.conn = sqlite3.connect(":memory:", check_same_thread=False)
        cur = self.conn.cursor()
        cur.execute("CREATE TABLE datapoint(x, y, commentCount)")
        cur.execute("CREATE TABLE comment(id, username, text, datapoint)")
        cur.execute("""
            INSERT INTO datapoint VALUES
                (1, 2, 0),
                (2, 3, 3),
                (3, 4, 0),
                (4, 6, 0),
                (5, 8, 1),
                (6, 5, 0),
                (7, 3, 1),
                (8, 6, 0),
                (9, 7, 0),
                (10, 9, 0)
        """)
        cur.execute("""
            INSERT INTO comment VALUES
                (1, "Dave", "Nice data!", 2),
                (2, "Sally", "Good job everyone", 2),
                (3, "Dave", "This release was tough", 2),
                (4, "Mike", "This isn't good", 5),
                (5, "Steve", "Looking better", 7)
        """)
        self.conn.commit()

    def get_data(self):
        res = self.conn.execute("SELECT * FROM datapoint")
        ret = []
        for item in res.fetchall():
            ret.append(DataPoint(item[0], item[1], item[2]))
        return ret

    def get_comments(self):
        res = self.conn.execute("SELECT * FROM comment")
        ret = []
        for item in res.fetchall():
            ret.append(Comment(item[0], item[1], item[2], item[3]))
        return ret

    def add_comment(self, new_comment):
        res = self.conn.execute(f"SELECT commentCount FROM datapoint WHERE x={new_comment.datapoint}")
        new_count = res.fetchall()[0][0] + 1
        cur = self.conn.cursor()
        cur
        cur.execute(f"""
            INSERT INTO comment VALUES
                (
                    {new_comment.id}, 
                    "{new_comment.username}", 
                    "{new_comment.text}", 
                    {new_comment.datapoint}
                )
        """)
        cur.execute(f"UPDATE datapoint SET commentCount={new_count} WHERE x={new_comment.datapoint}")
        self.conn.commit()