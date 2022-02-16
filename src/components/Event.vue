<template>
  <div
    class="event"
    :class="{
      event_red: event.type === 'red',
      event_green: event.type === 'green',
      event_yellow: event.type === 'yellow',
    }"
  >
    <div class="event__inner">
      <div class="event__date">{{ event.date }}</div>
      <div class="event__name">{{ event.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'event',
  props: {
    event: {
      type: Object,
    },
  },
};
</script>

<style lang="postcss" scoped>
.event {
  display: flex;
  margin-top: 3px;
  &_red {
    .event__inner {
      background-color: #fceced;
      color: #d9969f;
    }
  }
  &_green {
    .event__inner {
      background-color: #e8f9e8;
      color: #a7c9ae;
    }
  }
  &_yellow {
    .event__inner {
      background-color: #ffebd2;
      color: #d3b991;
    }
  }
  &:hover {
    position: relative;
    z-index: 2;
    .event__inner {
      max-width: fit-content;
    }
    .event__name {
      overflow: visible;
    }
  }
  &__inner {
    display: flex;
    border-radius: 7px;
    padding: 3px 4px;
    font-size: 16px;
    font-weight: 400;
    max-width: 100%;
  }
  &__name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__date {
    margin-right: 5px;
  }
}
</style>
