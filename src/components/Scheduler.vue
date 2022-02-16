<template>
  <div class="calendar">
    <div class="calendar__header">
      <div class="calendar__controls">
        <button
          class="calendar__controls-btn calendar__controls-btn_left"
          @click="getPreviousMonth"
        >
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.70718 6.70718L1.70718 11.7072L0.292969 10.293L4.58586 6.00008L0.292969 1.70718L1.70718 0.292969L6.70718 5.29297L7.41429 6.00008L6.70718 6.70718Z"
              fill=""
            />
          </svg>
        </button>
        <div class="calendar__controls-title">
          {{ month }}
          <div class="calendar__controls-info" v-if="!isCurrentYear">
            {{ dateContext.year() }}
          </div>
        </div>

        <button
          class="calendar__controls-btn calendar__controls-btn_right"
          @click="getNextMonth"
        >
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.70718 6.70718L1.70718 11.7072L0.292969 10.293L4.58586 6.00008L0.292969 1.70718L1.70718 0.292969L6.70718 5.29297L7.41429 6.00008L6.70718 6.70718Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      <div class="calendar__weekdays">
        <div
          class="calendar__weekdays-day"
          v-for="day in weekdays"
          :key="day.id"
          :class="{ 'calendar__weekdays-day_weekend': isWeekend(day) }"
        >
          {{ day.date }}
        </div>
      </div>
    </div>
    <div class="calendar__body">
      <div
        class="calendar__day"
        v-for="day in previousMonthDays"
        :key="day.id"
        :class="{ calendar__day_light: isBeforeCurrentDate(day) }"
      >
        {{ day.date }}
      </div>
      <div
        class="calendar__day"
        v-for="day in daysInMonth"
        :key="day.id"
        :class="{
          calendar__day_weekend: isWeekend(day),
          calendar__day_light: isBeforeCurrentDate(day),
          calendar__day_today: isToday(day.id),
        }"
      >
        {{ day.date }}
        <div class="calendar__events-wrapper" v-if="day.events.length">
          <div class="calendar__events">
            
              <Event :event="eventItem" 
               v-for="eventItem in day.events"
              :key="eventItem.id"/>
           
          </div>
        </div>
      </div>
      <div
        class="calendar__day"
        v-for="day in nextMonthDays"
        :key="day.id"
        :class="{ calendar__day_weekend: isWeekend(day),
         calendar__day_light: isBeforeCurrentDate(day) }"
      >
        {{ day.date }}
      </div>
    </div>
  </div>
</template>

<script>
import Event from './Event.vue';
export default {
  name: 'Scheduler',
  components: {
    Event,
  },
  data() {
    return {
      dateContext: this.$moment(),
    };
  },
  props: {
    events: {
      type: Array,
      required: true,
    },
  },
  beforeCreate() {
    this.$moment.locale('ru');
  },
  methods: {
    getPreviousMonth() {
      this.dateContext = this.$moment(this.dateContext).subtract(1, 'M');
    },
    getNextMonth() {
      this.dateContext = this.$moment(this.dateContext).add(1, 'M');
    },
    isWeekend(day) {
      return day.dayType === '0' || day.dayType === '6';
    },
    isBeforeCurrentDate(date) {
      const curDate = this.$moment().format('YYYY-MM-DD');
      return this.$moment(date.id).isBefore(curDate, 'day');
    },
    isToday(date) {
      return this.$moment(date).isSame(this.$moment(), 'day');
    },
  },
  computed: {
    todayEvents() {},
    isCurrentYear() {
      return this.$moment(this.dateContext).isSame(this.$moment(), 'year');
    },
    month() {
      return this.dateContext.format('MMMM');
    },
    weekdays() {
      const week = Array.from({ length: 7 }, (_, i) => {
        const day = this.$moment().startOf('week').add(i, 'days');
        return {
          id: day.format('YYYY/MMMM/DD'),
          dayType: day.format('d'),
          date: day.format('dddd'),
        };
      });
      return week;
    },
    daysInMonth() {
      const days = Array.from(
        { length: this.dateContext.daysInMonth() },
        (_, i) => {
          const monthDay = this.dateContext.startOf('month').add(i, 'days');
          const events = this.events
            .filter(event => this.$moment(event.date).isSame(monthDay, 'day'))
            .map(event => {
              const time = this.$moment(event.date).format('HH:mm');
              return {
                ...event,
                date: time,
              };
            });
          return {
            id: monthDay.format('YYYY-MM-DD HH:mm'),
            dayType: monthDay.format('d'),
            date: monthDay.format('D'),
            events: events,
          };
        },
      );
      return days;
    },
    currentDate() {
      return this.dateContext.get('date');
    },
    previousMonthDays() {
      const prevMonth = this.$moment(this.dateContext).subtract(1, 'month');
      const prevMonthDays = Array.from(
        { length: this.$moment(this.dateContext).startOf('month').weekday() },
        (_, i) => {
          const monthDay = prevMonth.endOf('month').subtract(i, 'days');
          return {
            id: monthDay.format('YYYY-MM-DD HH:mm'),
            dayType: monthDay.format('d'),
            date: monthDay.format('D'),
          };
        },
      );
      return prevMonthDays.reverse();
    },
    nextMonthDays() {
      const nextMonth = this.$moment(this.dateContext).add(1, 'month');
      const nextMonthDays = Array.from(
        { length: 6 - this.$moment(this.dateContext).endOf('month').weekday() },
        (_, i) => {
          const monthDay = nextMonth.startOf('month').add(i, 'days');
          return {
            id: monthDay.format('YYYY-MM-DD HH:mm'),
            dayType: monthDay.format('d'),
            date: monthDay.format('D'),
          };
        },
      );
      return nextMonthDays;
    },
  },
};
</script>

<style lang="postcss" scoped>
.calendar {
  border-radius: 35px;
  padding: 35px;
  background-color: #fff;
  &__controls {
    display: flex;
    align-items: center;
    &-title {
      min-width: 115px;
      text-align: center;
      font-size: 21px;
      font-weight: 700;
      text-transform: uppercase;
      margin: 0 4px;
      color: #595d96;
      /* display: flex; */
    }
    &-info {
    }
    &-btn {
      width: 20px;
      height: 20px;
      cursor: pointer;
      outline: none;
      background-color: transparent;
      border: none;
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        path {
          fill: #a5a4ab;
        }
      }
      &_left {
        transform: rotate(180deg);
      }
    }
  }
  &__weekdays {
    margin-top: 25px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    &-day {
      text-align: right;
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      color: #3b3b3b;
      &_weekend {
        opacity: 0.4;
      }
    }
  }
  &__body {
    margin-top: 20px;
    border-radius: 10px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  &__day {
    min-height: 150px;
    background-color: #fff;
    border: 1px solid #ebebeb;
    border-radius: 8px;
    padding: 10px;
    text-align: right;
    font-size: 18px;
    font-weight: 700;
    position: relative;
    &_blank {
      background-color: #f5f5f5;
    }
    &_light {
      background-color: #f5f5f5;
      color: #d3d3d3;
    }
    &_weekend {
      color: #c4cfe4;
    }
    &_today {
      color: #84da9e;
      border-color: #a0a0a0;
    }
  }
  &__events {
    position: absolute;
    width: 100%;
    left: 0;
    &-wrapper {
      position: relative;
      text-align: left;
    }
  }
}
</style>
