package com.google.sps;
import java.util.*; 
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Collection;
import java.util.Iterator;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {


    Collection<TimeRange> collection = new ArrayList<TimeRange>();
    int arr[] = new int[1441];
    for(int i = 0; i < arr.length; i++) {
        arr[i] = 0;
    }
    Collection<String> meeting = request.getAttendees();

    Iterator<Event> itr = events.iterator();
    TimeRange temptr;

    while (itr.hasNext()){
      Event event = (Event)itr.next();
      Set<String> temp = event.getAttendees();
      Iterator itrmeeting = meeting.iterator();
      
      while (itrmeeting.hasNext()){
        String name = (String)itrmeeting.next();
        
        if (temp.contains(name)){
          temptr = event.getWhen();
          arr[temptr.start()]++;
          arr[temptr.start()+temptr.duration()]--;
        }
      }

    }
    int count=0;
    int start_time=0;
    int flag=0;
    for(int i = 1; i < arr.length; i++) {
        arr[i] = arr[i]+arr[i-1];
    }
    if(arr[0]==0)
    {
        count=1;
        start_time=0;
    }
    for(int i = 1; i < arr.length-1; i++) {
        if(arr[i]==0)
        {
            if(arr[i-1]==0)
            {
                count++;
            }
            else
            {
                count=1;
                start_time=i;
            }
        }
        else
        {
            if(count>=request.getDuration())
            collection.add(TimeRange.fromStartDuration(start_time, count));
            count=0;
        }
    }
    if(count>=request.getDuration())
    collection.add(TimeRange.fromStartDuration(start_time, count));
    return collection;
  }
}
