<%--
  Created by IntelliJ IDEA.
  User: Kostya
  Date: 28.11.2022
  Time: 1:19
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>result</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body >

<br>
<p align="left"> Check results: </p>
<br>
<div id="result" >
    <jsp:include page="table.jsp" />
</div>
<br>
<div class="form" align="center" >
    <form method="get" action="index.jsp">
        <input type="submit" value='Back' >
    </form>
</div>
</body>
</html>
