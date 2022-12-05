<%--
  Created by IntelliJ IDEA.
  User: Kostya
  Date: 24.11.2022
  Time: 16:15
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html style="overflow: auto; height: 100%; width: 100%;">
<head>
    <title>Hitting the area</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/style.css">
</head>
<body style="overflow: auto; height: 100%; width: 100%; margin: 0;">
<table class="general_table">
    <tr>
        <th class="banner" colspan="3">
            <p>Petrov Konstantin</p>
            <p>Group P32081</p>
            <p>Option 918120</p>
        </th>
    </tr>
    <tr class="second_line">

        <th class="banner_area">
            Area
        </th>
        <th class="banner_input_data">
            Input data
        </th>
        <th class="banner_results">
            Results
        </th>

    </tr>
    <tr class="third_line">
<%--valign="top" down--%>
<%--        width="30%"--%>
        <td valign = "top">

            <canvas class="area"  id="graph" alt="График" width=""></canvas>


        </td>

        <td class="input_data" valign = "top">
            <form id="inpform" class="validate_form" method="post">

                <div class="input">
                    <b>Input coordinate X:</b><br>
                    <div>
                        <input  type="checkbox" name="x_coordinate" class="x" id="x_value_-5" value="-5" > -5<br>
                        <input  type="checkbox" name="x_coordinate" class="x" id="x_value_-4" value="-3"> -4<br>
                        <input  type="checkbox" name="x_coordinate" class="x" id="x_value_-3" value="-2"> -3<br>
                        <input  type="checkbox" name="x_coordinate" class="x" id="x_value_-2" value="-1"> -2<br>
                        <input  type="checkbox" name="x_coordinate" class="x" id="x_value_-1" value="0"> -1<br>
                        <input  type="checkbox" name="x_coordinate" class="x" id="x_value_0" value="1" checked> 0<br>
                        <input  type="checkbox" name="x_coordinate" class="x" id="x_value_1" value="2"> 1<br>
                        <input  type="checkbox" name="x_coordinate" class="x" id="x_value_2" value="3"> 2<br>
                        <input  type="checkbox" name="x_coordinate" class="x" id="x_value_3" value="4"> 3<br>
                    </div>
                </div>
                <div class="input">
                    <b>Input coordinate Y:</b><br>
                    <div>
                        <input autocomplete="off" type="text" name="y_coordinate" class="y" placeholder="From -5 to 5" required="required">
                    </div>
                </div>
                <div class="input">
                    <b>Enter radius:</b><br>
                    <div>
                        <input  type="checkbox" name="r_coordinate" class="r" id="r_value_1" value="1" checked> 1<br>
                        <input  type="checkbox" name="r_coordinate" class="r" id="r_value_2" value="2"> 2<br>
                        <input  type="checkbox"  name="r_coordinate" class="r" id="r_value_3" value="3"> 3<br>
                        <input  type="checkbox" name="r_coordinate" class="r" id="r_value_4" value="4"> 4<br>
                        <input  type="checkbox" name="r_coordinate" class="r" id="r_value_5" value="5"> 5<br>
                    </div>
                </div>
                <p><input type="submit" class="validate_button" value="submit"></p>
            </form>
            <input type="submit" class="reset_button" value='Reset table'/>
        </td>

        <td valign = "top">
            <div id="result_table">
                <jsp:include page="all_table.jsp" />
            </div>
        </td>

    </tr>

</table>
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="js/client.js" ></script>
<script src="js/graph.js" ></script>
</body>
</html>
