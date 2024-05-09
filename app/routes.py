

from flask import make_response
from app import app
from app.views import *
from app.sheduler import *
from app.doctors import *
from app.patients import *
import time, random
from datetime import datetime


@app.route("/emulate/<int:start_id>", methods=['GET'])
def emulate(start_id):
    timestamp_milis = str(time.time() * 1000)[:-5]
    if start_id == 0:
        response = make_response('''try { window['mbsc_jsonp_comp_1']('{"_calendarSize":1,"_calendarType":"month","_dragTimeStep":15,"_showWeekNumbers":false,"_eventListSize":1,"_eventListType":"month","_scheduleType":"week","_showCalendar":false,"_showEventCount":false,"_showEventLabels":false,"_showEventList":false,"_showSchedule":false,"_showScheduleAllDay":true,"_showScheduleDays":false,"_scheduleStartDay":1,"_scheduleEndDay":0,"_scheduleSize":1,"_scheduleTimeCellStep":60,"_scheduleTimeLabelStep":60,"_showTimeline":true,"_timelineType":"week","_timelineStartDay":1,"_timelineEndDay":6,"_timelineSize":1,"_timelineTimeCellStep":1440,"_timelineTimeLabelStep":1440,"_timelineListing":true,"_timelineResolution":"hour","_rangeStartDay":1,"_rangeEndDay":6,"_rangeType":"week","_popoverClass":"","_refresh":true}'); } catch (ex) {}''', 200)
        response.mimetype = "application/javascript"
    elif start_id == 1:
        response = make_response('''try { window['mbsc_jsonp_comp_12']('{"_controls":[{"name":"time","title":"Laikas"}],"_hasDate":false,"_hasTime":true,"_hasTimegrid":false,"_valueFormat":"HH:mm"}'); } catch (ex) {}''', 200)
        response.mimetype = "application/javascript"
    elif start_id == 2:
        response = make_response('try { window["mbsc_jsonp_'+timestamp_milis+'"](); } catch (ex) {}', 200)
        response.mimetype = "application/javascript"
    elif start_id == 3:
        response = make_response('try { window["mbsc_jsonp_'+timestamp_milis+'"](); } catch (ex) {}', 200)
        response.mimetype = "application/javascript"
    return response
