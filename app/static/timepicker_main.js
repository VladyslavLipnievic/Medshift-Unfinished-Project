      $( document ).ready(function(){


        $(".simpleExample").timepicker();

        $("#textAndSizeExample").timepicker({
          hourHeaderText: "時",
          minHeaderText: "分",
          okButtonText: "決定",
          cancelButtonText: "閉じる",
          selectSize: 5
        });

        $("#timeFormatExample").timepicker({
          timeFormat: "%g:%i %A"
        });

        $("#minmaxTimeExample1").timepicker({
          minTime: "11:00",
          maxTime: "10:00 pm"
        });

        $("#minmaxTimeExample2").timepicker({
          minTime: "10:45",
          maxTime: "10:15"
        })

        $("#disableTimeRangeExample").timepicker({
          disableTimeRanges: [["10:00", "14:30"], ["14:45", "23:15"]]
        });

        $("#stepExample1").timepicker({
          minTime: "10:45",
          maxTime: "19:15",
          hourStep: 2,
          minStep: 7
        });

        $("#stepExample2").timepicker({
          minTime: "10:45",
          maxTime: "19:15",
          timeStep: 7
        });

        $("#scrollDefaultExample").timepicker({
          scrollDefault: "13:15"
        });

        $("#12HourClockExample").timepicker({
          use12HourClock: true,
          timeFormat: "%g:%i %A"
        });

        $("#ampmTextExample").timepicker({
          use12HourClock: true,
          timeFormat: "%a %g時%i分",
          ampmText: { am:"午前", pm:"午後" }
        });

        $("#12HourPlusMinMaxTimeExample").timepicker({
          use12HourClock: true,
          timeFormat: "%h:%i %a",
          minTime: "13:15",
          maxTime: "6:15"
        });

        $("#12HourPlusTimeStepExample").timepicker({
          use12HourClock: true,
          timeFormat: "%h:%i %a",
          minTime: "13:15",
          maxTime: "6:15",
          timeStep: 7
        });

        $("#eventExample")
          .timepicker()
          .on("change", function(){
            $("#output").html($("#eventExample").val());
        });




      });