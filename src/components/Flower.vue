<template>
  <g>
    <g :id="type + 'opinion'">
      <path
        :class="'st0 ' + type + 'opinion'"
        d="M60.5,64.9c-3.1,3.1-8.3,5.6-10,4c-1.8-1.7,0.3-8,4.5-11.2c3-2.3,7.8-3.6,9.2-1.9
		C65.7,57.6,63.1,62.3,60.5,64.9z"
      />
      <path
        :class="'st0 ' + type + 'opinion'"
        d="M60.8,83.7c-3.1,3.1-8.3,5.6-10,4c-1.8-1.7,0.3-8,4.5-11.2c3-2.3,7.8-3.6,9.2-1.9C66,76.3,63.5,81,60.8,83.7z"
      />
      <path
        :class="'st0 ' + type + 'opinion'"
        d="M60.8,102.7c-3.1,3.1-8.3,5.6-10,4c-1.8-1.7,0.3-8,4.5-11.2c3-2.3,7.8-3.6,9.2-1.9
		C66,95.3,63.5,100,60.8,102.7z"
      />
    </g>
    <g :id="type + 'issue'">
      <g>
        <line
          :class="'st1 ' + type + 'issue'"
          x1="49.5"
          y1="35.5"
          x2="49.5"
          y2="169.5"
        />
      </g>
    </g>
    <g :id="type + 'topic'" class="spin">
      <g>
        <g>
          <path
            :class="'st2 ' + type + 'topic'"
            d="M50,19c4.4,0,8,3.6,8,8s-3.6,8-8,8s-8-3.6-8-8S45.6,19,50,19 M50,18c-5,0-9,4-9,9s4,9,9,9s9-4,9-9
			S55,18,50,18L50,18z"
          />
        </g>
        <g>
          <path
            :class="'st2 ' + type + 'topic'"
            d="M49.8,36.6c1.2,0,2.3,1.1,2.3,2.3s-1.1,2.3-2.3,2.3s-2.3-1.1-2.3-2.3S48.6,36.6,49.8,36.6 M49.8,35.8
			c-1.8,0-3.2,1.4-3.2,3.2c0,1.8,1.4,3.2,3.2,3.2s3.2-1.4,3.2-3.2C53,37.2,51.6,35.8,49.8,35.8L49.8,35.8z"
          />
        </g>
        <g>
          <path
            :class="'st2 ' + type + 'topic'"
            d="M43.9,34.9c1.2,0,2.3,1.1,2.3,2.3s-1.1,2.3-2.3,2.3s-2.3-1.1-2.3-2.3S42.6,34.9,43.9,34.9 M43.9,34
			c-1.8,0-3.2,1.4-3.2,3.2c0,1.8,1.4,3.2,3.2,3.2c1.8,0,3.2-1.4,3.2-3.2C47,35.4,45.6,34,43.9,34L43.9,34z"
          />
        </g>
        <g>
          <path
            :class="'st2 ' + type + 'topic'"
            d="M39.6,30.6c1.2,0,2.3,1.1,2.3,2.3c0,1.2-1.1,2.3-2.3,2.3s-2.3-1.1-2.3-2.3C37.3,31.6,38.3,30.6,39.6,30.6
			 M39.6,29.7c-1.8,0-3.2,1.4-3.2,3.2c0,1.8,1.4,3.2,3.2,3.2c1.8,0,3.2-1.4,3.2-3.2C42.7,31.1,41.3,29.7,39.6,29.7L39.6,29.7z"
          />
        </g>
        <g>
          <path
            :class="'st2 ' + type + 'topic'"
            d="M38.2,24.4c1.2,0,2.3,1.1,2.3,2.3S39.4,29,38.2,29s-2.3-1.1-2.3-2.3S37,24.4,38.2,24.4 M38.2,23.6
			c-1.8,0-3.2,1.4-3.2,3.2s1.4,3.2,3.2,3.2c1.8,0,3.2-1.4,3.2-3.2S39.9,23.6,38.2,23.6L38.2,23.6z"
          />
        </g>
        <g>
          <path
            :class="'st2 ' + type + 'topic'"
            d="M39.8,18.4c1.2,0,2.3,1.1,2.3,2.3S41,23,39.8,23s-2.3-1.1-2.3-2.3S38.6,18.4,39.8,18.4 M39.8,17.6
			c-1.8,0-3.2,1.4-3.2,3.2s1.4,3.2,3.2,3.2c1.8,0,3.2-1.4,3.2-3.2S41.6,17.6,39.8,17.6L39.8,17.6z"
          />
        </g>
        <g>
          <path
            :class="'st2 ' + type + 'topic'"
            d="M44.5,14.2c1.2,0,2.3,1.1,2.3,2.3s-1.1,2.3-2.3,2.3s-2.3-1.1-2.3-2.3S43.3,14.2,44.5,14.2 M44.5,13.4
			c-1.8,0-3.2,1.4-3.2,3.2s1.4,3.2,3.2,3.2c1.8,0,3.2-1.4,3.2-3.2S46.3,13.4,44.5,13.4L44.5,13.4z"
          />
        </g>
        <g>
          <path
            :class="'st2 ' + type + 'topic'"
            d="M55.8,34.9c1.2,0,2.3,1.1,2.3,2.3s-1.1,2.3-2.3,2.3c-1.2,0-2.3-1.1-2.3-2.3S54.6,34.9,55.8,34.9 M55.8,34
			c-1.8,0-3.2,1.4-3.2,3.2c0,1.8,1.4,3.2,3.2,3.2c1.8,0,3.2-1.4,3.2-3.2C59,35.4,57.6,34,55.8,34L55.8,34z"
          />
        </g>
        <g>
          <path
            :class="'st2 ' + type + 'topic'"
            d="M60.2,30.6c1.2,0,2.3,1.1,2.3,2.3c0,1.2-1.1,2.3-2.3,2.3S58,34.1,58,32.8C58,31.6,59,30.6,60.2,30.6
			 M60.2,29.7c-1.8,0-3.2,1.4-3.2,3.2c0,1.8,1.4,3.2,3.2,3.2c1.8,0,3.2-1.4,3.2-3.2C63.4,31.1,62,29.7,60.2,29.7L60.2,29.7z"
          />
        </g>
        <g>
          <path
            :class="'st2 ' + type + 'topic'"
            d="M61.9,24.7c1.2,0,2.3,1.1,2.3,2.3s-1.1,2.3-2.3,2.3c-1.2,0-2.3-1.1-2.3-2.3S60.6,24.7,61.9,24.7 M61.9,23.8
			c-1.8,0-3.2,1.4-3.2,3.2s1.4,3.2,3.2,3.2c1.8,0,3.2-1.4,3.2-3.2S63.6,23.8,61.9,23.8L61.9,23.8z"
          />
        </g>
        <g>
          <path
            :class="'st2 ' + type + 'topic'"
            d="M60.2,18.7c1.2,0,2.3,1.1,2.3,2.3s-1.1,2.3-2.3,2.3S58,22.2,58,20.9S59,18.7,60.2,18.7 M60.2,17.8
			c-1.8,0-3.2,1.4-3.2,3.2s1.4,3.2,3.2,3.2c1.8,0,3.2-1.4,3.2-3.2S62,17.8,60.2,17.8L60.2,17.8z"
          />
        </g>
        <g>
          <path
            :class="'st2 ' + type + 'topic'"
            d="M55.8,14.2c1.2,0,2.3,1.1,2.3,2.3s-1.1,2.3-2.3,2.3c-1.2,0-2.3-1.1-2.3-2.3S54.6,14.2,55.8,14.2 M55.8,13.4
			c-1.8,0-3.2,1.4-3.2,3.2s1.4,3.2,3.2,3.2c1.8,0,3.2-1.4,3.2-3.2S57.6,13.4,55.8,13.4L55.8,13.4z"
          />
        </g>
        <g>
          <path
            :class="'st2 ' + type + 'topic'"
            d="M50.2,12.7c1.2,0,2.3,1.1,2.3,2.3s-1.1,2.3-2.3,2.3s-2.3-1.1-2.3-2.3S48.9,12.7,50.2,12.7 M50.2,11.9
			c-1.8,0-3.2,1.4-3.2,3.2s1.4,3.2,3.2,3.2c1.8,0,3.2-1.4,3.2-3.2S51.9,11.9,50.2,11.9L50.2,11.9z"
          />
        </g>
      </g>
    </g>
  </g>
</template>

<script>
export default {
  props: {
    type: String,
  },
};
</script>

<style scoped>
.st0 {
  fill: none;
  stroke-width: 1.5px;
  stroke-miterlimit: 10;
}
.st1 {
  fill: none;
  stroke-miterlimit: 10;
}
.spin {
  animation: spinner 10s linear infinite;
  transform-origin: 50% 15%;
}
@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>