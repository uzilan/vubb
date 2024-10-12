<script setup lang="ts">
import { cilCircle, cilMinus } from '@coreui/icons'
import { CIcon } from '@coreui/icons-vue'
import ThreeOfAKindFourQs from '@/components/instructions/ThreeOfAKindFourQs.vue'
import ThreeOfAKindThree2s from '@/components/instructions/ThreeOfAKindThree2s.vue'
import StraightC2toC5 from '@/components/instructions/StraightC2toC5.vue'
import StraightH6toH0 from '@/components/instructions/StraightH6toH0.vue'
import ThreeOfAKindThree5s from '@/components/instructions/ThreeOfAKindThree5s.vue'
import StraightSjtoS1 from '@/components/instructions/StraightSjtoS1.vue'
import Card from '@/components/instructions/Card.vue'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from '@coreui/vue/dist/esm/components/table'
import ThreeOfAKindThree8s from '@/components/instructions/ThreeOfAKindThree8s.vue'
import StraightD5toD8 from '@/components/instructions/StraightD5toD8.vue'
</script>

<template>
  <div class="links">
    <a href="#whatis" class="nowrap">{{ $t('message.whatIsUbb') }}</a> -
    <a href="#seven" class="nowrap">{{ $t('message.sevenSets') }}</a> -
    <a href="#goal" class="nowrap">{{ $t('message.goal') }}</a> -
    <a href="#sets" class="nowrap">{{ $t('message.sets') }}</a> -
    <a href="#buying" class="nowrap">{{ $t('message.buying') }}</a> -
    <a href="#jokers" class="nowrap">{{ $t('message.jokers') }}</a> -
    <a href="#points" class="nowrap">{{ $t('message.counting') }}</a>
  </div>
  <div class="instructions">
    <a id="whatis" />
    <h5>{{ $t('message.whatIsUbb') }}</h5>
    <p>{{ $t('message.ubbIs') }}:</p>
    <ul>
      <li class="no-dot">
        <b>{{ $t('message.trio') }}</b>
        - {{ $t('message.threeOrMore') }}:
        <div class="example-group">
          <ThreeOfAKindThree2s />
          {{ $t('message.or') }}
          <ThreeOfAKindFourQs />
        </div>
      </li>
      <li class="no-dot">
        <b>{{ $t('message.straight') }}</b>
        - {{ $t('message.fourOrMore') }}:
        <div class="example-group">
          <StraightC2toC5 />
          {{ $t('message.or') }}
          <StraightH6toH0 />
        </div>
      </li>
    </ul>
    <hr />
    <a id="seven" />
    <h5>{{ $t('message.sevenSets') }}</h5>
    {{ $t('message.ubbIsPlayedInSevenSeries') }}:
    <CTable striped>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell class="bold" scope="col">{{ $t('message.set') }}</CTableHeaderCell>
          <CTableHeaderCell scope="col" class="bold nowrap"
            >{{ $t('message.dealtCards') }}
          </CTableHeaderCell>
          <CTableHeaderCell class="bold" scope="col">{{ $t('message.goal') }}</CTableHeaderCell>
          <CTableHeaderCell class="bold" scope="col"
            >{{ $t('message.description') }}
          </CTableHeaderCell>
          <CTableHeaderCell class="bold" scope="col">{{ $t('message.example') }}</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow>
          <CTableDataCell> 1</CTableDataCell>
          <CTableDataCell> 7</CTableDataCell>
          <CTableDataCell class="nowrap">
            <CIcon :icon="cilCircle" size="l" />
            <CIcon :icon="cilCircle" size="l" />
          </CTableDataCell>
          <CTableDataCell>{{ $t('message.twoTrios') }}</CTableDataCell>
          <CTableDataCell>
            <div class="table-example-group">
              <ThreeOfAKindThree2s />&nbsp;&nbsp;<ThreeOfAKindThree5s />
            </div>
          </CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell> 2</CTableDataCell>
          <CTableDataCell> 8</CTableDataCell>
          <CTableDataCell class="nowrap">
            <CIcon :icon="cilCircle" size="l" />
            <CIcon :icon="cilMinus" size="l" />
          </CTableDataCell>
          <CTableDataCell>{{ $t('message.oneTrioAndOneStraight') }}</CTableDataCell>
          <CTableDataCell>
            <div class="table-example-group">
              <ThreeOfAKindThree2s />&nbsp;&nbsp;<StraightSjtoS1 />
            </div>
          </CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell> 3</CTableDataCell>
          <CTableDataCell> 9</CTableDataCell>
          <CTableDataCell class="nowrap">
            <CIcon :icon="cilMinus" size="l" />
            <CIcon :icon="cilMinus" size="l" />
          </CTableDataCell>
          <CTableDataCell>{{ $t('message.twoStraights') }}</CTableDataCell>
          <CTableDataCell>
            <div class="table-example-group"><StraightC2toC5 />&nbsp;&nbsp;<StraightSjtoS1 /></div>
          </CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell> 4</CTableDataCell>
          <CTableDataCell> 10</CTableDataCell>
          <CTableDataCell class="nowrap">
            <CIcon :icon="cilCircle" size="l" />
            <CIcon :icon="cilCircle" size="l" />
            <CIcon :icon="cilCircle" size="l" />
          </CTableDataCell>
          <CTableDataCell>{{ $t('message.threeTrios') }}</CTableDataCell>
          <CTableDataCell>
            <div class="table-example-group">
              <ThreeOfAKindThree2s />&nbsp;&nbsp;<ThreeOfAKindThree8s />&nbsp;&nbsp;<ThreeOfAKindThree5s />
            </div>
          </CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell> 5</CTableDataCell>
          <CTableDataCell> 10</CTableDataCell>
          <CTableDataCell class="nowrap">
            <CIcon :icon="cilCircle" size="l" />
            <CIcon :icon="cilCircle" size="l" />
            <CIcon :icon="cilMinus" size="l" />
          </CTableDataCell>
          <CTableDataCell>{{ $t('message.twoTriosAndOneStraight') }}</CTableDataCell>
          <CTableDataCell>
            <div class="table-example-group">
              <ThreeOfAKindThree5s />&nbsp;&nbsp;<ThreeOfAKindThree2s />&nbsp;&nbsp;<StraightD5toD8 />
            </div>
          </CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell> 6</CTableDataCell>
          <CTableDataCell> 10</CTableDataCell>
          <CTableDataCell class="nowrap">
            <CIcon :icon="cilCircle" size="l" />
            <CIcon :icon="cilMinus" size="l" />
            <CIcon :icon="cilMinus" size="l" />
          </CTableDataCell>
          <CTableDataCell>{{ $t('message.oneTrioAndTwoStraight') }}</CTableDataCell>
          <CTableDataCell>
            <div class="table-example-group">
              <ThreeOfAKindThree2s />&nbsp;&nbsp;<StraightD5toD8 />&nbsp;&nbsp;<StraightSjtoS1 />
            </div>
          </CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell> 7</CTableDataCell>
          <CTableDataCell> 10</CTableDataCell>
          <CTableDataCell class="nowrap">
            <CIcon :icon="cilMinus" size="l" />
            <CIcon :icon="cilMinus" size="l" />
            <CIcon :icon="cilMinus" size="l" />
          </CTableDataCell>
          <CTableDataCell>{{ $t('message.threeStraights') }}</CTableDataCell>
          <CTableDataCell>
            <div class="table-example-group">
              <StraightC2toC5 />&nbsp;&nbsp;<StraightD5toD8 />&nbsp;&nbsp;<StraightSjtoS1 />
            </div>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
    <hr />
    <a id="goal" />
    <h5>{{ $t('message.goal') }}</h5>
    {{ $t('message.theGoalIs') }}<a href="#points">{{ $t('message.below') }}</a
    >.
    <hr />
    <a id="sets" />
    <h5>{{ $t('message.sets') }}</h5>
    {{ $t('message.setsArePlayedThus') }}:
    <ol>
      <li>
        {{ $t('message.setsArePlayedThus1_1') }}<b>{{ $t('message.drawPile') }}</b
        >{{ $t('message.setsArePlayedThus1_2') }}<b>{{ $t('message.discardPile') }}</b
        >{{ $t('message.setsArePlayedThus1_3') }}
        <div class="group">
          <div class="pile">
            <Card code="jq" height="100px" />
            <br />
            <b>{{ $t('message.discardPile') }}</b>
          </div>
          &nbsp;
          <div class="pile">
            <img src="/SVG-cards/pile.png" class="pile-image" alt="card pile" /><br />
            <b>{{ $t('message.drawPile') }}</b>
          </div>
        </div>
      </li>
      <li>{{ $t('message.setsArePlayedThus2') }}</li>
      <li>
        {{ $t('message.setsArePlayedThus3') }}<b>{{ $t('message.setsArePlayedThus3_1') }}</b
        >{{ $t('message.setsArePlayedThus3_2') }}
      </li>
      <li>{{ $t('message.setsArePlayedThus4') }}</li>
      <li>{{ $t('message.setsArePlayedThus5') }}</li>
      <li>{{ $t('message.setsArePlayedThus6') }}</li>
    </ol>
    <hr />
    <a id="buying" />
    <h5>{{ $t('message.buying') }}</h5>
    <p>{{ $t('message.buying1') }}</p>
    <p>
      {{ $t('message.buying2_1') }}<b>{{ $t('message.buying2_2') }}</b
      >{{ $t('message.buying2_3') }}
    </p>
    <p>{{ $t('message.buying3') }}</p>
    <hr />
    <a id="jokers" />
    <h5>{{ $t('message.jokers') }}</h5>
    {{ $t('message.jokers1') }}:
    <div class="example-group">
      <div class="example">
        <Card code="c4" />
        <Card code="c5" />
        <Card code="rj" />
        <Card code="c7" />
      </div>
      {{ $t('message.or') }}
      <div class="example">
        <Card code="c8" />
        <Card code="h8" />
        <Card code="bj" />
      </div>
    </div>
    {{ $t('message.jokers2') }}
    <hr />
    <a id="points" />
    <h5>{{ $t('message.counting') }}</h5>
    {{ $t('message.counting1') }}
    <CTable striped>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell class="bold" scope="col">{{ $t('message.cards') }}</CTableHeaderCell>
          <CTableHeaderCell class="bold" scope="col">{{ $t('message.example') }}</CTableHeaderCell>
          <CTableHeaderCell class="bold" scope="col"
            >{{ $t('message.pointsHeader') }}
          </CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow>
          <CTableDataCell>2-9</CTableDataCell>
          <CTableDataCell>
            <div class="example">
              <Card code="h2" />
              <Card code="h3" />
              <Card code="h4" />
              <Card code="h5" />
              <Card code="h6" />
              <Card code="h7" />
              <Card code="h8" />
              <Card code="h9" />
            </div>
          </CTableDataCell>
          <CTableDataCell>5</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell>{{ $t('message.jackQueenAndKing') }}</CTableDataCell>
          <CTableDataCell>
            <div class="example">
              <Card code="cj" />
              <Card code="cq" />
              <Card code="ck" />
            </div>
          </CTableDataCell>
          <CTableDataCell>10</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell>{{ $t('message.ace') }}</CTableDataCell>
          <CTableDataCell>
            <div class="example">
              <Card code="s1" />
            </div>
          </CTableDataCell>
          <CTableDataCell>25</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell>{{ $t('message.joker') }}</CTableDataCell>
          <CTableDataCell>
            <div class="example">
              <Card code="bj" />
              <Card code="rj" />
            </div>
          </CTableDataCell>
          <CTableDataCell>50</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell class="short">{{ $t('message.jokerSubstitute') }}</CTableDataCell>
          <CTableDataCell>
            <div class="group">
              <div class="example">
                <Card code="r3" />
                <Card code="r4" />
                <Card code="bj" />
                <Card code="r6" />
              </div>
              <div class="example">
                <Card code="r5" />
              </div>
            </div>
          </CTableDataCell>
          <CTableDataCell>50</CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
  </div>
</template>

<style scoped>
.links {
  text-align: left;
  gap: 10px;
  width: 100%;
}

.instructions {
  text-align: left;
  overflow-y: scroll;
  overflow-x: scroll;
}

.table-example-group {
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 10px;
}

.short {
  max-width: 200px;
}

hr {
  border-top: 5px dotted red;
  margin-top: 30px;
}

span {
  white-space: nowrap;
}

li {
  padding-bottom: 10px;
}

.bold {
  font-weight: bolder;
}

.group {
  display: flex;
  gap: 10px;
  padding: 10px;
}

.pile {
  height: 140px;
  padding: 10px;
  width: fit-content;
  border: 1px solid hsla(160, 100%, 37%, 1);
  background-color: hsla(160, 100%, 98%, 1);
}

.pile-image {
  height: 100px;
}

table,
thead,
tbody,
tr,
th,
td {
  background-color: white !important;
}
</style>
