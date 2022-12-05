<%@ page import="beans.Point" %><%--
  Created by IntelliJ IDEA.
  User: Kostya
  Date: 27.11.2022
  Time: 0:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<table id="result_table"table class="results">
    <jsp:useBean id="table" class="beans.PointBean" scope="session"/>
    <thead>
    <th >X</th>
    <th >Y</th>
    <th >R</th>
    <th >Hit fact</th>
    <th >Current time</th>
    <th >Script running time, sec</th>
    </thead>

    <tbody>
    <%
        if (table != null) {
            for (Point check : table.getPoints()) {
    %>
    <tr>
        <td class="x"><%=check.getX()%>
        </td>
        <td class="y"><%=check.getY()%>
        </td>
        <td class="r"><%=check.getR()%>
        </td>
        <td class="hit" style='color:<%=(check.getHitFact() ? "ForestGreen" : "red")%>'>
<%--            //ForestGreen--%>
            <%= check.getHitFact() ? "hit" : "miss" %>
        </td>
        <td><%=check.getCurrentTime()%>
        </td>
        <td><%=check.getExecutionTime()%>
        </td>
    </tr>
    <%
            }
        }
    %>
    </tbody>
</table>