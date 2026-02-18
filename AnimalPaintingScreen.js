import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, SafeAreaView, Animated, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import Svg, { Path, G, ClipPath, Defs } from 'react-native-svg';
import { AslanSiyahCizgiler } from './hayvan/aslan';
import { KediSiyahCizgiler } from './hayvan/kedi';
import { KopekSiyahCizgiler } from './hayvan/kopek';
import { KusSiyahCizgiler } from './hayvan/kus';
import { KurtSiyahCizgiler } from './hayvan/kurt';
import { MaymunSiyahCizgiler } from './hayvan/maymun';
import { FilSiyahCizgiler } from './hayvan/fil';
import { InekSiyahCizgiler } from './hayvan/inek';
import { KartalSiyahCizgiler } from './hayvan/kartal';
import { BalikSiyahCizgiler } from './hayvan/balik';
import { AyiSiyahCizgiler } from './hayvan/ayi';
import { BalinaSiyahCizgiler } from './hayvan/balina';
import { TavsanSiyahCizgiler } from './hayvan/tavsan';
import { BibalikSiyahCizgiler } from './hayvan/bibalik';
import { YildizSiyahCizgiler } from './hayvan/yildiz';
import { TimsahSiyahCizgiler } from './hayvan/timsah';
import { ZürafaSiyahCizgiler } from './hayvan/zürafa';

const SVG_VIEW_WIDTH = 1024;
const SVG_VIEW_HEIGHT = 1536;

// Aslan figürünün ana path'i - boyama için maske
const ASLAN_GOVDE_YOLU = "M602.5 199.7c-32 2.8-64.1 15.6-86.4 34.6l-5.4 4.6-4.6-3.8c-18-15-42.5-24.9-68.8-27.6-8.6-.9-19.5 1-22.7 4-3.1 2.9-3.2 5.5-.6 14.3 3.1 10.3 5.9 24.2 4.9 24.2-.5 0-5.3-.8-10.7-1.7-15.8-2.7-45.8-2.2-64.2 1-44.6 7.9-75.5 23.3-104.1 51.7-19.9 19.8-34.8 40.8-47.9 67.5-7.4 15.2-12 27.8-12 33.1 0 2.5.7 3.8 2.6 5 2.4 1.6 3.1 1.6 12.7-.5 5.6-1.2 13.3-2.4 17.1-2.8l7-.6-7.8 8.9c-24.3 27.7-42 65.5-48.6 103.3-3.8 21.7-3.2 51.6 1.4 62.5 2.7 6.6 6.1 5.9 23.6-4.3 4.6-2.8 8.5-4.9 8.7-4.7.2.1-.6 2.9-1.7 6.2-10.8 31.1-11.7 67.8-2.4 100.2 3.9 13.7 12.2 29.8 19.1 37.1 3.7 3.8 6.7 6.1 8 6.1 3.4 0 6.8-1.9 8.6-4.8.8-1.5 3.9-6 6.7-10l5.2-7.4 2.8 8.1c8.9 25.8 30.5 51.7 56.4 67.8 16.8 10.4 40.8 19.3 52.1 19.3 6.4 0 7.1-1.5 7.9-15.5.4-6.6.9-13.5 1.3-15.3l.6-3.4 4.1 4c35.7 34.3 93.2 60.8 138.1 63.8 18.2 1.2 22.6-1.7 33.3-22.1 3.4-6.6 7.1-13.1 8.1-14.4 2.1-2.8 1.6-3 17.5 7.1 25.9 16.7 36.1 18.2 63.1 9.6 21.9-6.9 46.1-21.8 64.6-39.5 5.4-5.3 9.9-9.3 9.9-9 0 .2 1.4 6 3.1 12.8 4.7 19 6.7 20 22.6 11.9 25.4-13 49.5-35.9 63.8-60.8 4.8-8.2 12.5-28.6 12.5-33 0-1.2.3-2.2.8-2.2.4 0 5 4.3 10.2 9.5 11.2 11.2 13.6 12 18.9 5.9 7.2-8.2 17.9-34.8 22.2-54.9 8.3-40 6-80.8-6.6-116.8-1.9-5.3-3-9.7-2.4-9.7.5 0 6.6 1.6 13.4 3.6 11.1 3.1 12.8 3.4 15.2 2.2 4.7-2.2 5.5-5.1 4.8-16.8-2.8-46.5-27.6-105.1-59.1-139.4-2.5-2.6-4.4-4.9-4.2-5.1.2-.1 4.6-1 9.8-1.9 17.9-3.2 20-4.3 20-10.1 0-2.4-1.4-5.4-4.7-10.2-20.7-30.3-58.2-61.5-96.4-80.4-22.4-11.1-51.3-20.4-69.8-22.4l-6.3-.7 8.6-8.7c7-7.1 8.6-9.2 8.6-11.7 0-4.4-3.1-6.7-13.5-9.7-24.4-7.2-47.1-9.8-69-8z";

// Kedi figürünün ana path'i - boyama için maske
const KEDI_GOVDE_YOLU = "M272.5 237.4c-9.2 4.1-15.4 19.2-18.4 44.6-1.2 10.7-.7 64.7.8 76 2.4 18 4.4 29 7.7 42l3.5 13.6-3.9 6.5c-16.6 27.3-27.5 58.5-31.7 90.3-.8 6.6-1.7 12.1-1.9 12.3-.1.2-6.9-.2-14.9-.9-13.8-1.1-14.7-1.1-16.7.7-2.7 2.5-2.6 7.1.3 8.9 1.2.7 6 1.7 10.7 2 4.7.4 11.2.9 14.6 1.2l6.1.6.6 11.7c.6 10.3 2.3 22.6 4.2 30.1.6 2.6.6 2.6-13.2 5.3-10.7 2.1-14.2 3.2-15.5 4.8-2.3 2.8-2.3 5.2.2 7.4 2.5 2.3 5.2 2.1 20.3-.9l11.9-2.3.9 2.4c.5 1.3.9 2.6.9 2.8 0 1.3 9.4 22 11.8 26.2l2.9 5-13.4 6.6c-14.3 7.2-16.2 9.1-14.3 14.2 1.7 4.6 4.6 4.1 19.8-3.2l14.1-6.9 8.1 9.8c8.6 10.3 18.2 19.3 31.5 29.4 49.4 37.5 133.6 58.2 228 56.1 31.3-.7 45.4-1.9 68.5-5.8 56.1-9.4 103.7-29.9 137.4-58.8 7.7-6.6 18-17.6 25.3-26.9l1.8-2.3 13.3 6.6c7.3 3.6 14.4 6.5 15.6 6.5 2.6 0 5.6-2.9 5.6-5.4 0-3.6-2.2-5.3-14.8-11.5l-12.9-6.4 5.7-12.1c3.2-6.7 6.6-14.6 7.6-17.6 1-3 2.1-5.9 2.5-6.3.4-.5 7 .3 14.8 1.8 7.8 1.4 15 2.4 16 2 3.7-1.1 4.7-8.6 1.3-10.4-.9-.5-7.5-2.1-14.7-3.5-7.1-1.5-13.1-2.9-13.3-3-.2-.2.4-4.1 1.3-8.7.8-4.5 2.1-14.4 2.7-21.9l1.2-13.7L807 535c16.6-1.4 19-2.3 19-7.4 0-5.3-1.6-6-12.8-5.2-5.3.4-12.4.9-15.8 1.3l-6.1.5-1.2-10.2c-3.5-30.8-15.9-66.9-32.3-93.9l-3.3-5.5 4.3-17c6.9-27.2 8.6-43.4 8.6-79.6.1-24.8-.3-32.7-1.8-42-3.5-22.5-9.1-34.5-17.5-38.3-4.2-1.9-5.3-1.9-13.3-.9-30.8 3.8-77.8 29.7-120.3 66.2l-10 8.6-12-2.8c-28.8-6.6-72-10.8-96-9.3-30.2 1.9-43.9 3.6-66.8 8.6-11.9 2.6-14.1 2.8-15.5 1.7-1-.8-5.1-4.3-9.2-7.9-38-33.2-84-58.9-115-64.5-9.4-1.7-13.7-1.7-17.5 0z";

// Köpek figürünün ana path'i - boyama için maske
const KOPEK_GOVDE_YOLU = "M492.5 261.1c-14.5 1.2-39 5.6-53.1 9.4-16.8 4.6-29.6 9.5-44.8 17l-13 6.4-5.3-5c-25.3-23.9-75.1-15.3-123.8 21.4-44.5 33.5-86.8 88.6-100.4 130.7-4.2 13-5.4 20.6-5.4 33 .1 16.4 3.2 28.9 11.1 44.4 10.9 21.2 28.9 38 48.2 44.7 8.7 3.1 25.7 3.3 34 .5 9-3 20.3-9.3 26.2-14.6l5.6-5 .6 7.3c3.5 39.2 15.6 65.5 41.4 89.8 34.6 32.6 99.2 55.1 172.5 60 25.8 1.7 76.7.7 96.2-2 74.8-10.2 124.4-34.9 152.2-76.1 7.3-10.9 15.5-30.2 18.9-44.6 1.9-8.4 4.4-25.7 4.4-31.2v-4.4l6.2 5.7c18.1 16.3 41.8 21.6 61.9 13.8 15.6-6.1 30.3-18.6 41.1-34.9 16.6-25 20.5-57.6 10.4-87-15.8-46.7-63.8-106.3-110.4-137.4-29.3-19.5-61.4-29.8-84.6-27.1-11.7 1.3-23.4 6.8-29.5 13.7l-4 4.6-5.5-3.1c-12.7-7.3-36.1-16.6-53.1-21.1-32.3-8.5-65.8-11.6-98-8.9z";

// Kuş figürünün ana path'i - boyama için maske
const KUS_GOVDE_YOLU = "M488.5 226.7c-58.3 5.2-108.2 26.3-146.2 61.8-38.4 35.7-62.2 88.7-66 146.4l-.8 11.4-8.5 4.3c-4.7 2.4-15.5 7.6-24 11.6-20.5 9.5-45.7 22.9-55 29.1-22.5 15.2-28.8 31.1-17.3 43.8 6.8 7.5 14.4 10.6 28.5 11.6l8.8.6v3.2c0 3.8 4.7 11.4 8.6 14.2 8.4 5.8 21 7.6 34.4 4.9 8.4-1.8 18.7-5.8 23.9-9.5l2.9-2.1 1.1 6.8c4.6 26.8 17.8 52.4 37.5 72.5 25.9 26.4 67.4 48.1 110.6 57.7l7.5 1.6.3 10.5.3 10.6-6.8 1.2c-8.4 1.5-20.9 6.5-28.6 11.4-4.7 3-5.7 4.2-5.7 6.5 0 6.2 4.4 6.7 15.1 1.9 8.2-3.8 19.2-7.7 21.3-7.7 1 0 .5 2.1-2 7.7-3.6 8.4-4 10.4-2.4 13.4 1.2 2.2 5.7 2.6 8.3.7 1.8-1.4 6.8-11.2 8.6-17.1l1.3-3.7 4.5 3.2c2.4 1.8 8 6.5 12.3 10.5 5.5 5.1 8.6 7.3 10.4 7.3 3.3 0 5.9-3.8 5-7.4-.8-3.3-14.6-16.3-23.7-22.4l-6.8-4.6.2-9.8.3-9.8 3 .5c26.2 4.3 42.8 5.2 74.6 4.3 20.5-.5 28.3-1.2 50-4.4l4.5-.6-.2 9.8-.2 9.8-7.3 5.4c-4 3-10.8 8.8-15 13-6.4 6.3-7.8 8.2-7.8 10.7 0 7.6 5.2 7.4 13.7-.5 8.5-8 16.2-14 17.8-14 .7 0 1.9 1.7 2.5 3.7 1.7 5.1 6.9 15.6 8.4 16.5 3.5 2.3 9.6-.6 9.6-4.6 0-1-1.5-5.4-3.4-9.7l-3.4-7.9 2.6.6c5.7 1.4 12 3.7 20.5 7.6 7.6 3.4 9.3 3.9 11.3 2.9 2.9-1.3 3.8-3.3 3-6.4-1.1-4.4-23.9-15.3-36.3-17.3l-4.3-.7v-21.2l8.3-1.8c16.4-3.7 41.5-12.8 58.2-21.2 47.7-24 75.8-55.8 86.1-97.4 1.9-7.5 3.4-14.6 3.4-15.8 0-2.1.2-2 5.5 1.2 3 1.8 9.4 4.5 14.2 6.1 7.5 2.5 10.4 2.9 19.8 2.9 9.8 0 11.6-.3 16.5-2.6 8.4-4 15-12 15-18.2 0-2.3.4-2.4 8-3.1 21.7-1.8 34-10.9 34-25.2 0-11-7.2-19.6-27-32.6-10.3-6.8-25.9-14.8-63.5-32.7l-19-9.1-1.2-11.7c-2.8-28-5.8-42.8-12.9-63.4-10.9-31.9-27.6-58.2-51.5-81.5-36.3-35.2-83.1-56.2-140.4-62.9-11.8-1.4-43.6-1.8-55-.8z";

// Kurt figürünün ana path'i - boyama için maske
const KURT_GOVDE_YOLU = "M296.2 226.2c-13.2 6.5-20.8 27.6-23.3 64.3-1.4 20.2-.4 66.3 1.9 92l1.8 19-5.8 9.2c-5.5 8.7-15 27-21.3 40.8-13.8 30.2-20.7 41.1-34.6 54.6-7.1 6.9-9.9 10.3-9.9 12 0 4.8 20.9 18 30.7 19.5l4.5.7-3.7 3.7c-2 2-6.9 6.1-11 9.1-7 5.1-9.2 8.1-7.9 11.1 1.7 4 19.3 15.7 27.1 17.8 3.8 1.1 4.3 1.6 6.2 7 6.4 17.4 26 38.2 52.1 55.2 20.9 13.7 55.8 29.2 83.8 37.2 40.6 11.7 71.8 16.4 114.4 17.3 35.7.7 61.9-1.2 92.3-6.8 41.7-7.8 81.1-21.3 112.5-38.7 21.8-12.1 39.2-25.3 51.8-39.5 6.2-7.1 13.6-18.6 15.8-24.8 1.6-4.3 2.5-5.4 5.4-6.6 9.3-3.6 24.8-13.6 27.5-17.7.9-1.3 1.3-3 .9-3.9-.3-.8-3.8-4-7.7-7.1-4-3-8.9-7.2-11-9.4l-3.9-3.9 3.8-.8c6-1.1 16-6 23.5-11.5 9.8-7.3 9.9-8.9 1.7-15.6-13.2-11-25.9-29.4-35.1-50.9-9.3-21.6-19.3-40.6-28.2-53.5-2.9-4.2-3.1-4.9-2.4-10 2.8-20.6 4.1-49.6 3.6-80.8-.8-50.5-4.8-70.7-16.6-83.5-5.7-6.1-9.4-7.7-18.1-7.7-22.7 0-63.4 25.5-102.5 64.1l-15 14.9-15.5-3.5c-20.8-4.7-32.6-6.3-53.3-7.5-17.9-1-43.4-.2-60.7 2-8.5 1.1-34.8 6.2-41.1 8-3.3 1-3.4.8-16.8-12.3-25.5-25-52.7-45.4-76.7-57.5-16.3-8.2-30.4-10.4-39.2-6z";

// Maymun figürünün ana path'i - boyama için maske
const MAYMUN_GOVDE_YOLU = "M477 270.5c-66.6 8.1-119.6 33.4-162.1 77.1-10.1 10.5-19.8 22.6-26.9 33.6-2.3 3.8-4.6 6.8-4.9 6.8-.4 0-2.4-1.2-4.5-2.6-12.8-8.7-24.8-13.6-38.9-15.9-11.7-1.9-20-1.9-31.1.1-20.2 3.5-35.7 11.3-49.7 24.9-12 11.6-19.6 24.9-24 42-3 11.4-3.2 31.2-.6 41.9 4.2 16.8 11.8 30.6 23.5 42.8 17.1 17.8 36.3 27.4 62 30.8 8.7 1.2 27.6.9 35.7-.6 2.9-.5 3.1-.3 4.8 5.3 10.5 33.3 40.5 68.2 77.2 89.8 37.5 22 72.6 32.9 133.5 41.2 17.9 2.4 63.3 2.5 82.5 0 31.6-3.9 56.4-9.4 80.8-17.6 18.3-6.2 22.4-7.9 36-14.7 23.5-11.7 40.2-23.8 57.2-41.6 16.7-17.4 27.9-35 35.5-55.6 1.6-4.2 3.3-7.6 3.9-7.5 20.1 4.6 49.3 1.3 69.3-8 26-12 45.7-35 52.3-61.3 4.6-17.9 4.2-33.6-1.2-50.8-15-48.2-71-74.7-120.1-56.7-8.8 3.2-20.6 9.7-23.6 13-1.1 1.2-2.2 2.1-2.6 2.1-.4 0-2.4-2.8-4.5-6.3-6.1-9.9-18.3-25.4-27.5-35.1-41.4-43.2-99-70.3-164.2-77.1-17.7-1.8-52.8-1.8-67.8 0z";

// Fil figürünün ana path'i - boyama için maske
const FIL_GOVDE_YOLU = "M490.5 284.1c-45.2 3.2-91.4 18.5-126.5 41.7l-9.5 6.4-4.5-2.7c-14.7-8.6-33.9-15.8-50.5-19.1-12.1-2.4-38.8-2.4-49.4-.1-54.7 12.5-100.7 61-116.6 123.2-7.6 30-7.2 57.4 1.3 78.2 8.3 20.4 24.7 33.6 46.6 37.4 5.3.9 6.6 1.5 7.2 3.2 1.4 4.9 7.9 16.5 12.1 21.6 12.9 15.9 28.9 24.3 49.1 25.7 10.1.8 25.8-2.4 35-7l6.5-3.3 7.1 7.5c22.7 23.9 57.4 42.6 100.6 54.1 29.8 7.9 57.2 11.8 92.5 13.1l22 .7 10 3.7c14.8 5.5 22.2 6.9 36.5 6.9 14.1.1 24.9-2.2 35.2-7.3 6.5-3.3 14.5-9.6 15.3-12.1.4-1.1 2.9-2.3 7.8-3.4 35.9-8.7 68.6-23.3 91.2-41 7.2-5.7 18.4-16.3 21.7-20.7 1.2-1.6 1.8-1.5 8.1 1.6 9.7 4.7 20.2 7 32.2 7 12.3-.1 20-2 31.8-8.1 14-7.2 26.2-21.7 32.6-38.6.7-1.7 2-2.8 3.8-3.2 18.2-3.4 26.4-7.4 36.3-17.4 13.3-13.4 18.7-28.3 19.7-54.1 2.4-62.9-36.1-129.7-90.2-156.5-20.3-10.1-33.1-13-56.5-12.9-17.8 0-27.6 1.6-43.9 7.1-10.6 3.5-25.9 10.6-31.1 14.3-1.6 1.1-3.1 2-3.4 2-.3 0-4.3-2.5-9-5.5-38.9-25.1-79.7-38.4-130.1-42.5-13.7-1.1-23.9-1.1-41 .1z";

// İnek figürünün ana path'i - boyama için maske
const INEK_GOVDE_YOLU = "M382.5 270.5c-7.7 4.1-13.1 12.5-16 24.7-1.9 8.1-1.9 27.4 0 35.3.8 3.3 1.4 6.8 1.5 7.7 0 .9-3.7 4.5-8.2 8.1-4.6 3.6-10.5 8.8-13.3 11.6l-4.9 5.1H325c-11.5 0-20.3.6-29 2-42.2 6.7-78.5 26.1-89.1 47.6-3.1 6.2-3.4 7.7-3.3 15.4 0 7.2.4 9.4 2.8 14.3 6.6 13.7 24.7 26.2 48.1 33.2 7.2 2.1 11.8 2.8 23.3 3.2 7.8.3 14.2 1 14.2 1.5s-2.2 7.6-4.9 15.6c-8.1 24.1-9.6 32.6-9.5 53.7 0 16.6.3 18.7 2.8 27 7.4 24.5 20.9 42.1 44.3 57.8 32.2 21.6 85.6 36.6 144.5 40.8 26.6 1.8 86.3.7 106.3-2 43.8-5.9 74.9-14.2 102.2-27.1 46.8-22.2 69.8-54.6 69.6-98-.1-17.1-2.9-30.3-11.7-55.3-2.6-7.1-4.6-13-4.6-13.1 0-.2 6-.6 13.3-.8 20-.8 36.5-5.7 52.2-15.6 13.9-8.7 21.6-18.6 23.4-30.1 1.9-12-1.5-21.3-11.8-32.3-14.5-15.4-40-27.5-72.4-34.4-10-2.1-16-2.6-32.7-3.1l-20.5-.5-7.5-7.2c-4.1-4-10.1-9.2-13.2-11.5-3.2-2.4-5.8-4.4-5.8-4.5 0 0 .7-3.6 1.5-7.9.8-4.4 1.5-13.4 1.5-20.2 0-21-5.8-34.7-17.2-40.6-14.2-7.3-34.9 6.4-47.6 31.8-1.8 3.4-3.6 6.4-4.1 6.7-.5.3-6.5-.7-13.3-2.4-40.2-9.6-86.2-9.8-127.3-.4-6 1.3-12.1 2.7-13.5 3-2.2.5-2.8 0-4.9-4.3-6.7-13.9-19.5-28.7-28.6-33.3-6.3-3.1-15.7-3.8-20-1.5z";

// Kartal figürünün ana path'i - boyama için maske
const KARTAL_GOVDE_YOLU = "M487 260.1c-30.3 3.5-57.5 11.9-89.5 27.6-6.7 3.3-13 6.2-14.2 6.5-2.5.7-4.1 5.3-2.6 7.7 1.7 2.7 5.7 5 11.2 6.4l5.4 1.4-6.9 4.9c-25.3 17.8-48.3 42.4-71.9 76.9-4.9 7.1-11.2 16-14.1 19.6-4.6 5.8-7.3 8.6-17 17.6-2.9 2.7-3.2 7.3-.6 9.6 4.6 4.2 9.2 5.2 24 5.1 7.8 0 14.2.3 14.2.7 0 2-11.1 27.9-17.1 39.9-13 26-30.6 48.5-45 57.5-6.3 4-6.2 9.7.1 13 4.2 2.2 18.2 3.8 26.5 3 14.6-1.4 27.8-4.7 40.4-10 3.5-1.4 6.5-2.5 6.7-2.3.2.2-2.7 4.4-6.3 9.3-8.6 11.6-21.3 24.3-28.6 28.4-7.2 4.1-8.3 6-5.6 9.5 2.5 3.2 13.9 6.9 30.4 9.9 10.4 1.9 15.7 2.1 39.5 2.1 30.4 0 38.8-1.1 56.2-7.4 4.5-1.7 8.6-3 9.1-3 1.7 0-1.7 3.3-9 8.7-4.6 3.4-7.3 6.1-7.3 7.3 0 6.5 15 9.5 46.5 9.5 23.4-.1 31.6-1 46.5-5.2 6.9-1.9 22.5-8.1 26.5-10.4l2.9-1.8 17.1 16.7c24.3 23.9 41.7 38.2 46.5 38.2 4.4 0 8.7-4.4 13.1-13.5 3-6.2 4.3-10.6 5.2-16.9.6-4.7 1.5-8.6 2-8.6 1.8 0 13.4 9 21.9 17 5.2 4.8 11.1 11.6 14.4 16.6 5.1 7.7 5.9 8.4 8.9 8.4 2.7 0 4.1-.9 7.5-4.7 12.3-14 20.7-40.5 19.8-62.8l-.3-9 15-.6c17.6-.7 25.9-2.8 35.2-8.8 7.1-4.6 10.3-8.4 10.3-12.2 0-3.4-2-5.5-6.2-6.4-23.4-5.1-54.3-47.9-52.6-73l.3-5 8.5-4.2c10.4-5.1 26.6-10.6 38-12.8 4.7-.9 15.8-1.9 24.6-2.2l16.2-.6 2.7 4.1c3.1 4.8 5.5 12.1 5.5 17.2 0 4.5 1.4 6 5.7 6 5.9 0 12.9-7.9 20.4-23.1 5.5-11.1 7.1-19.4 7.2-37.4 0-17.1-1.2-23.9-6.6-35.6-17-36.7-50.9-57.6-100-61.7-5.9-.5-10.8-1.1-11-1.3-13.3-21.1-30.5-33.8-62.4-46.4-24.4-9.6-58.7-17.1-88.7-19.5-15.1-1.2-57.8-1.1-68.6.1z";

// Balık figürünün ana path'i - boyama için maske
const BALIK_GOVDE_YOLU = "M277.8 2.6c-3.5 1.8-4.8 4.3-4.8 8.8 0 6.1 4.7 23.9 12.1 45.9 3.8 11.5 6.6 21.4 6.2 21.8-.5.5-7.9 3.3-16.4 6.3-45.4 15.7-90.1 37.5-125.1 61l-5 3.4-8.9-7.4c-24.7-20.5-58.5-38.6-104-55.8C10 78.4 5.9 78.1 2 84.5l-2 3.3 2 6.5c4.2 13.6 15.2 37.6 25.8 56.2 7.5 13.2 17.5 27.4 26.7 37.8L63 198l-7.8 9.8c-9.5 11.7-19.1 25-25.4 35.2-12 19.5-27.2 52.3-28.4 61.4-.6 3.9-.3 4.8 2 7.1 2.5 2.5 3.3 2.7 8.4 2.3 7-.6 26.4-7.5 51.2-18.4 12.5-5.4 38.6-19 48.9-25.4 5.7-3.6 14.8-10.2 20.2-14.8 5.5-4.5 10.6-8.2 11.4-8.2.7 0 7.7 4.1 15.5 9 28.9 18.5 56.5 32.7 86.5 44.5 9.4 3.7 17.2 6.9 17.4 7.1.2.2-2.1 7.2-5.2 15.6-10.2 28.3-14 42.9-13.5 51.3.3 4.3.7 5.2 3.8 7.3 4.2 2.8 5.7 2.5 20.5-3.6 22.1-9.3 54.5-26.3 78-41l12-7.5 12.5 1.1c15.4 1.5 49.6 1.5 65 .2 15.7-1.4 29.5-4.1 50.8-9.9 47.6-13.1 88.8-36.4 123.6-70.1 19.2-18.6 31.3-35.4 35.2-48.6 1.4-4.9 1.4-5.9 0-10.7-.8-2.9-3.7-8.8-6.3-13.2-31.3-52.1-96.9-95.2-167-109.9-19.7-4.1-33.3-5.7-55.7-6.5l-21.3-.7-6.9-5c-25.6-18.5-61.1-37.6-92.9-50.2-12.8-5-14.4-5.4-17.7-3.6z";

// Ayı figürünün ana path'i - boyama için maske
const AYI_GOVDE_YOLU = "M65 1.9C48.3 5.8 36.9 12.1 24.5 24.5c-12 12-17.8 22.1-22.2 38.6-2.3 8.8-2.3 29 0 37.8 2.3 8.5 5.8 16.9 9.8 23.9 4.5 7.5 19.9 22.9 27.2 27.1 3.1 1.8 5.7 3.7 5.7 4.3 0 .5-.9 4.4-2 8.6-7 27.5-7.7 59.7-2 87.8 4.7 22.7 16.3 49.4 29.8 68.4 8.2 11.6 27.6 31.3 39.6 40.2 71.2 52.9 177.8 53.1 249 .4 33.4-24.7 57-59.2 67.6-98.8 8.3-31.3 8.2-69.5-.5-101.8-.8-3-1.3-5.5-1.2-5.5.1-.1 3.6-2.3 7.7-5 43.3-27.7 49.8-89.8 13.2-126.3-32-32-85-31.9-116.1.1l-4.3 4.5-9.7-4.7c-25-12.4-47-17.9-75.1-18.8-31.4-1-61.3 5.5-87.8 19.2l-8.2 4.2-6.1-5.8C119.6 4.3 90.5-4 65 1.9z";

// Balina figürünün ana path'i - boyama için maske
const BALINA_GOVDE_YOLU = "M71.5 84.9c-7.7 3.5-13.4 11.5-13.5 18.8 0 4.7 1.6 4.9 6 .9 12.7-11.5 27.9-3.9 28 14v6.1l-7.5.7c-19.9 1.8-32.9 7.7-46.1 21C24.6 160.2 19 173.3 19 191.6c0 26.7 15.9 53.2 39.2 65 13.2 6.7 34.1 10 56.8 9 15.1-.6 25-2.2 33.5-5.2 3.7-1.3 8.4-1.8 18-2 14.7-.2 36-2.8 41.4-5 9.5-4 10.6-9.3 3.3-16.4l-4.7-4.6 5.6-6.7c14.4-17.1 22.5-43.6 19.9-64.6-1-7.2-.9-7.6 1.4-10 1.4-1.5 3.5-4.9 4.8-7.6 4.5-9.8 2.3-28.4-4.3-36.9-2.9-3.7-5.4-3.2-10.9 2.3-5.4 5.4-8.1 10-10.5 18.4l-1.6 5.7h-5.3c-4 0-6.2.6-9.7 2.8-5 3.3-12 10.5-14.3 15-2 4-.7 5.6 6.9 8.4 5 1.9 8 2.3 18.1 2.3h12.2l-.9 2.3c-2.7 7.2-8.3 14.3-13 16.8-3.8 1.9-10.6 1.7-15.4-.5-6.2-2.8-15.5-10.2-29.3-23.4-7-6.6-14.9-13.8-17.7-16-7.2-5.7-17.7-10.6-27.9-13.2l-9-2.2.2-4.4c1-14.6 7.5-22 18.1-20.4 4.7.7 11.1 3.9 11.1 5.6 0 .5.7.9 1.5.9 2.2 0 1.9-4.7-.9-10.5-2.8-6-5.6-8.7-11.6-11.4-7.9-3.6-16.1-2.5-23.3 3.1l-3.9 3-1.5-2.2c-3.9-5.5-16.1-7.6-23.8-4.1z";

// Tavşan figürünün ana path'i - boyama için maske
const TAVSAN_GOVDE_YOLU = "M122.5 28.3c-13.6 4.6-23.9 14.7-32.6 32-5.1 10.1-7.2 15.9-10.3 28.7-5.1 21.1-7.7 57.9-5.7 81 .6 6.9 1.3 15.6 1.6 19.5 1.4 16.2 7.6 44.9 16.7 76 9.7 33.5 16.4 50.8 30.8 79.5 19.2 38.3 27.8 53 44.3 75.4 8 10.9 24.6 31.1 30.4 37.1l2.9 3L189 472c-13.9 14-21.7 23.5-32.6 40-14.7 22.3-24.5 42.3-32.3 65.7-7.3 21.7-13.6 50.2-16.1 72.8-1.7 14.8-4.2 25.3-10.9 45.7-5.1 15.3-8.2 26.9-10.7 39.5-.4 2-1.2 2.1-11.1 2.7-19.4 1.1-32.7 2.7-35.1 4.2-2.5 1.6-2.9 5.5-.8 7.4 1.3 1 10.7.7 12.6-.5.3-.2 7.8-.6 16.8-1l16.2-.7-.2 7.3c-.2 9.1 2.7 28.7 5.7 39.2 1.5 5.4 1.9 8 1.1 8.2-.6.2-6.3 2.3-12.6 4.6-20 7.2-23.7 9.9-21 15 1.5 2.7 3 2.4 19.5-3.9 19.9-7.7 17.5-8.1 23.5 4 14.6 28.9 39.1 55.3 68 73 39.4 24.1 107.7 44.2 168.1 49.3 33.3 2.8 39.1 3 65.4 2.4 43.2-1 92.6-9 137-22.1 49.6-14.6 98.4-49.9 125.6-90.8 3.5-5.3 7.7-12.4 9.3-15.8 1.6-3.4 3.3-6.2 3.8-6.2.7 0 19.2 6.9 31.6 11.8 5 1.9 7.5 1 8-3 .2-1.8-.4-3-2.1-4.1-3.4-2.2-21.9-10-29-12.3-4.4-1.4-5.6-2.1-5.1-3.3 2.5-6.4 6.5-30.8 6.7-40.8.1-10.7.3-11.2 2.2-10.8 1.1.2 5.2.6 9 .9 3.9.3 12.7 1.3 19.7 2.3 10.4 1.3 13 1.4 14.2.3 2-1.6 2.1-5.4.2-6.9-1.5-1.2-12-2.8-33.7-5.2l-11.7-1.2-.6-4.4c-1.2-8.9-5.9-26.1-10.7-38.8-6.7-18.1-8.5-25.5-10.8-44.5-1.1-9.1-2.3-17.6-2.5-19-.3-1.4-.7-4.2-1-6.2-.3-2.1-1.1-5.9-1.7-8.5-.6-2.7-1.3-5.9-1.5-7.3-4.8-25.5-18.4-60.5-32.9-84.5-16.8-27.9-31.2-45.7-48.8-60.6l-5.8-4.9 2.7-2.2c6.7-5.9 35.5-42.7 45.8-58.7 17.2-26.5 42.6-79 52-107.2 10.3-31 20-68.8 22.6-87.9.6-4.7 1.5-11 2-14 1.6-8.9 1.9-14.3 2.6-37.5 1.6-52.8-8.5-92.9-28.6-113.5-14-14.3-30.5-16.7-51.2-7.2-15 6.9-38.6 27.5-53.6 46.8-10.8 13.9-27.5 38.6-35.7 52.9-7.4 12.7-22.4 42.9-25.9 51.7-1.4 3.8-3.8 9.8-5.2 13.4-6.5 16.3-18.7 58.4-20.8 71.4-1 6.1-1.6 9.4-2.2 12-.3 1.4-.8 3.6-1 5-.2 1.4-.9 4.5-1.4 7-1.5 6.6-4.9 31.9-6.1 44.5-1.7 19.4-2.1 38.5-1 56.5.5 9.6.8 17.6.7 17.8-.2.1-3.9-.9-8.3-2.3-12.8-4-30.5-7.2-50.8-9.2-2.7-.3-13.3-.5-23.5-.6-25.3 0-43.6 2.2-65.5 7.8-7.1 1.9-13.7 3.7-14.6 4-1.5.5-1.6.1-.9-3.7.5-2.4 1.3-11.5 2-20.3 1.7-23.1-.4-57.2-5.5-89-.2-1.1-.9-5.4-1.5-9.5s-1.5-9.1-2-11c-.5-1.9-1.1-4.6-1.4-6-6.8-37.3-22.3-82.7-40.6-119.1-11.2-22.4-16-30.9-27.7-48.7-26-39.6-54.2-66.3-78.3-74.2-8.2-2.7-21.1-3.5-26.5-1.7z";

// Köpekbalığı figürünün ana path'i - boyama için maske
const BIBALIK_GOVDE_YOLU = "M444.5 24.1c-13.1 2-29.5 9.2-46.4 20.3-5.3 3.5-20.6 14.4-34.1 24.2-45.7 33.2-66.6 46.6-95.5 61.5-45.2 23.3-84.4 35-155.4 46.5-39.6 6.4-61.1 13.9-74.2 26.2-3.6 3.3-7.7 8.3-9.2 11-10.6 19.4-6.4 46.7 11.8 76.7 12.6 20.7 25.2 36.2 49.9 61.3 18.6 18.9 27.1 26.8 72.1 67.2 35.6 32 52.3 47.9 64.3 61.3 21.7 24.1 30.1 36.3 44.7 64.7 12.6 24.4 17.7 32.2 25.9 39.7 7.9 7.1 15.2 11.6 24.8 15.1 6.5 2.4 8.8 2.7 20.6 2.8l13.4.1 4.7 11.4c11 26.4 20 43.3 35.7 66.9 13.6 20.6 21.2 30 36.8 45.5 43.5 43.1 90.5 66.8 151.6 76.2 14.2 2.2 53.7 2.5 67.5.5 52.5-7.5 96.2-27.1 137-61.4 11.1-9.3 30.7-29.4 39.8-40.8 36.5-45.5 61.3-107.2 71.6-178 3.8-25.8 5.4-45.3 7.6-90.5 1.7-34.6 3.3-50.7 7.1-73.5 6.6-40 18.8-73 36.3-99 7.9-11.7 8.7-15.1 4.8-18.8-3.3-3.1-6.7-2.7-12.7 1.3-26.6 17.9-51.8 54.1-64.4 92.4-8.3 25.4-12.1 47-17.6 100.1-3.5 33.3-6.9 58.3-10.6 77.5-15.9 82.5-50 142.4-104.5 183.5-46.2 34.8-96.5 46.8-150.4 35.9-29.3-5.9-57.9-20.8-77.9-40.6-15.8-15.5-29.7-37.1-36.6-56.8-3.2-9.2-8-26.8-8-29.5 0-1.2 1.4-1.4 8.2-1.2 14.2.6 27-3.6 39.2-12.8 6.7-5.1 10.7-10 23.1-27.9 11.6-16.8 22.7-29.7 35.7-41.2 24-21.2 45-35.2 119.8-79.8 44.6-26.5 75.7-49.7 102.1-76.1 24.8-24.8 34.3-40.9 35.6-60.6 2.1-31.3-19.1-48.9-89.2-74-57.5-20.5-91.3-39-129.9-71.2-20.9-17.4-35.5-32-65.1-65.2-28.6-32.1-41.4-45.1-53-53.8-7.9-6-24.6-14.4-31.7-16.1-7-1.6-18.4-2.1-25.3-1z";

// Yıldız figürünün ana path'i - boyama için maske
const YILDIZ_GOVDE_YOLU = "M260.3 30c-5.6 2.9-8.9 7.5-17.7 25-14.9 29.6-25.5 59.5-39.1 110.6-7.3 27.5-9.8 31.9-20.7 36.1-6.5 2.6-40.3 2.3-59.6-.6-25.2-3.6-49.9-10.7-72.4-20.6-10.6-4.7-16.7-5.6-21.1-3.4-7 3.6-9.6 9.9-7.6 18.2 2.5 10.7 22 34.4 42.2 51.5 13.8 11.7 43.5 31.9 69.7 47.3 21.4 12.6 24.4 21.5 15.4 45.8-9.2 24.6-27.2 54-58.5 95.6-9.5 12.6-18.1 24.7-19.1 26.7-2.2 4.5-2.3 10.9-.3 14.7.8 1.7 3.4 3.8 6.1 5.1 7 3.4 11.7 2.4 28.5-6 29.3-14.6 61.3-35.6 106.4-69.4 27.9-21 32.1-23.3 40.1-22.1 5 .7 11.9 5.2 31.9 20.6 33.7 26 67.4 48.3 90.7 60 31.8 16 51.8 15 51.8-2.4 0-5.5-2.7-9.7-15.3-24-29-32.9-52.7-71.4-63.2-102.8-3.9-11.8-4.6-20.4-2.1-26.4 5.3-12.6 49-39.3 121.1-73.7 18.9-9 20.3-10.2 22.5-17.8 1-3.6-.3-8.8-3.1-12.4-3.3-4.3-8.6-6.3-19.4-7.4-26.1-2.8-47-2.5-102.5 1.8-29.3 2.3-44.5 2.5-50.4.8-9.3-2.8-14.9-12.1-20.6-34.4-6.9-26.5-10-55.2-11.6-104.7-.5-18.4-.9-21.2-2.8-24.9-4.1-8.1-11.6-10.7-19.3-6.8z";

// Timsah figürünün ana path'i - boyama için maske
const TIMSAH_GOVDE_YOLU = "M588 266.9c-4.7 1.1-11.4 3-15 4.4-3.8 1.5-10 2.8-14.5 3.2-7 .6-9 .3-16-1.9-24.9-7.9-48.7-8.7-66.2-2.1l-6.5 2.5-10.6-1.6c-7.6-1.2-14.2-1.5-22.7-1.1-21.4 1-33.4 6.3-48.2 21.3-10.9 11.1-10.5 11-28.6 6.5-17-4.3-26.5-5.5-38-4.7-10.7.7-16.7 2.7-20.2 6.6-1.7 1.8-2 3.5-1.9 9.9.1 8.7 2.5 16.1 8 24.2 1.9 2.8 3.4 5.2 3.4 5.3 0 .4-16.9-.6-31.5-2-25.5-2.5-46.4-.3-56.1 5.7-11 6.8-7.6 21.7 8.6 38l8.7 8.6-6.1.7c-3.4.4-15.3 1.1-26.6 1.6-27.7 1.2-43 4.5-55.4 12.1-6.2 3.7-8.6 7.2-8.6 12.6 0 8.9 12.7 22.8 27.7 30.6l8.2 4.2-7.5 2.7c-4.1 1.5-12.1 3.7-17.7 4.8-20.1 4.1-30.7 7.4-42.2 13.2-18.3 9.2-23.5 18.3-16.2 28 3.9 5.2 15.2 13 22.4 15.4 2.9 1 5.3 2.1 5.3 2.4-.1.5-5.1 4.3-11.5 8.7-9.9 6.7-13.7 19.3-10.1 33.1 11.7 43.7 78.2 89.7 159.5 110.2 86.9 21.9 168.9 15.8 225.9-17 6.4-3.7 17.1-10.4 23.7-15 6.6-4.6 15.1-10 19-12.1 19.5-10.5 49.3-11.7 110.5-4.3 47.5 5.7 48.4 5.7 73 5.7 52.7.1 99.9-11.2 130.2-31.1 9.7-6.4 21.7-17.7 26.8-25.5 8.4-12.5 10.3-28.4 4.7-38-5.1-8.6-17.5-17.2-26.6-18.4-2.3-.3-4.1-.8-4.1-1.2 0-.3 2.6-1.9 5.8-3.5 3.6-1.9 9-6.3 14.6-11.9l8.9-8.9-.6 5.2c-1 8.1 1.1 11 7.8 11 13.9 0 37.3-27.8 46.5-55 2.7-8 5-21.5 5-29.6 0-23.4-10.7-46.3-27.7-59.6-19.1-14.8-37.3-21.1-60.8-21.2-19.5 0-36.7 4.6-50.6 13.5l-6.2 4.1h-18.6c-14.4.1-21.8-.4-32.6-2-14.7-2.3-32-6.5-41.8-10.2-9.4-3.5-14.7-9.3-14.7-15.9 0-5.3-4.8-18.4-9.5-26.1-17.1-27.8-51.7-43-82.5-36.1z";

// Zürafa figürünün ana path'i - boyama için maske
const ZÜRAFA_GOVDE_YOLU = "M401 144.9c-11 3.5-20.5 11.2-25.3 20.3-5.5 10.5-5.8 25.2-.6 36.3 3.3 7.1 13.1 16.6 19.9 19.1 4.5 1.7 5.6 2.6 6.1 5 .3 1.6 3.2 13.4 6.3 26.1 3.1 12.8 5.6 23.6 5.6 24.1s-1.7 1.6-3.7 2.6c-2.1 1-8.2 4.7-13.7 8.3l-9.8 6.6-6.7-7.1c-24.4-25.8-59.4-41.8-96.1-43.7-20.4-1.1-36.9 1.5-50.7 7.9-15.7 7.5-22.1 19.3-18.8 34.9 7.6 36.5 51.7 72.8 96.9 79.8 8.4 1.3 28.3.7 31.4-1 2.8-1.5 2.8-.3.3 4.7-15.5 30.5-32.8 87.5-37.6 124.1-6.2 47.5 8.5 83.9 45 111.3 13.1 9.9 34.1 20.6 52.9 27 8.1 2.8 9.6 3.6 9.6 5.4 0 1.2-1.4 11.6-3 23-1.7 11.5-5.3 38-8.1 58.9-4.5 34.5-6.4 48.5-12.9 99-1.1 8.8-2.4 18.5-2.9 21.5-.9 5.6-.1 9 2.2 9H517c110 0 128.7-.2 129.9-1.5 1.6-1.5 1.2-4.3-7-55-2.1-13.2-4.8-31-5.9-39.5-1.2-8.5-4.4-30.6-7.1-49-6.2-42.8-9.9-69.3-9.6-69.5.1-.1 5.2-1.8 11.2-3.9 14.4-4.9 32.9-13.9 44.6-21.8 12.1-8.1 29.8-25.6 36-35.8 10-16.5 13.8-30.5 14.6-54.3.6-17.9-.1-26-4.3-47.7-6-30.9-17.7-67.8-29.5-92.9-2.7-5.7-4.9-10.7-4.9-11 0-.3 5.6-.4 12.3-.3 24 .7 49-7.5 71.7-23.6 14-9.9 29.3-27 35.8-39.7 6.2-12.4 8.1-27.4 4.5-35.5-2.4-5.4-10.2-12.9-17-16.4-11.2-5.6-33.5-9.3-50.8-8.3-35.2 2-67.9 16.3-92.7 40.7l-9.7 9.5-6.9-5c-3.7-2.7-10.5-6.8-15-9s-8.2-4.5-8.2-5c0-.6 2.9-12.2 6.4-25.8l6.4-24.8 5.9-2.8c7.6-3.6 16-11.9 19.8-19.6 2.8-5.5 3-6.8 3-16.5 0-9.3-.3-11.1-2.7-16.3-3.7-7.8-12.1-16-20.5-19.9-12.3-5.8-28.2-4.9-39.5 2.3-6.5 4.2-13.5 12-16.6 18.7-2.4 5.1-2.7 6.9-2.7 16.4v10.6l4.6 9.1 4.7 9.2-5.9 21.5c-3.2 11.8-5.9 22.2-5.9 23.1 0 1.7.4 1.7-15.5-1.2-24.3-4.4-53.5-4-80.5 1-7.4 1.3-13.5 2.3-13.6 2.2-.2-.2-3.1-10.8-6.4-23.7l-6.2-23.5 3.5-6.5c4.5-8.5 6.1-15.4 5.5-25-.9-14.7-9.9-27.8-23.6-34.3-5.9-2.8-7.8-3.2-16.2-3.4-5.2-.1-10.6.1-12 .6z";

export default function AnimalPaintingScreen({ onNavigate, initialAnimal = 'aslan' }) {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [color, setColor] = useState('#FF0000');
  const [strokeWidth, setStrokeWidth] = useState(50);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasLayout, setCanvasLayout] = useState({ width: 0, height: 0 });
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelAnimation] = useState(new Animated.Value(0));
  const [isEraser, setIsEraser] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(initialAnimal);

  const colors = [
    '#FF0000', '#FF1744', '#F50057', '#D500F9', 
    '#651FFF', '#3D5AFE', '#2979FF', '#00B0FF',
    '#00E5FF', '#1DE9B6', '#00E676', '#76FF03',
    '#C6FF00', '#FFEA00', '#FFC400', '#FF9100',
    '#FF6D00', '#FF3D00', '#DD2C00', '#BF360C',
    '#795548', '#6D4C41', '#5D4037', '#4E342E',
    '#9E9E9E', '#757575', '#616161', '#424242',
    '#212121', '#000000', '#FFFFFF', '#ECEFF1'
  ];

  const togglePanel = () => {
    const toValue = isPanelOpen ? 0 : 1;
    Animated.spring(panelAnimation, {
      toValue,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
    setIsPanelOpen(!isPanelOpen);
  };

  const panelTranslateX = panelAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const undoLastPath = () => {
    if (paths.length > 0) {
      setPaths(paths.slice(0, -1));
    }
  };

  const clearAll = () => {
    setPaths([]);
  };

  const toggleEraser = () => {
    setIsEraser(!isEraser);
  };

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    if (width > 0 && height > 0) {
      setCanvasLayout({ width, height });
    }
  };

  const convertToSVGCoords = (x, y) => {
    if (canvasLayout.width === 0 || canvasLayout.height === 0) return { x, y };
    
    const scaleX = canvasLayout.width / SVG_VIEW_WIDTH;
    const scaleY = canvasLayout.height / SVG_VIEW_HEIGHT;
    const scale = Math.min(scaleX, scaleY);
    
    const scaledWidth = SVG_VIEW_WIDTH * scale;
    const scaledHeight = SVG_VIEW_HEIGHT * scale;
    const offsetX = (canvasLayout.width - scaledWidth) / 2;
    const offsetY = (canvasLayout.height - scaledHeight) / 2;
    
    const svgX = (x - offsetX) / scale;
    const svgY = (y - offsetY) / scale;
    
    return { x: svgX, y: svgY };
  };

  const handleTouchStart = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    const svgCoords = convertToSVGCoords(locationX, locationY);
    setIsDrawing(true);
    setCurrentPath([svgCoords]);
  };

  const handleTouchMove = (event) => {
    if (!isDrawing) return;
    const { locationX, locationY } = event.nativeEvent;
    const svgCoords = convertToSVGCoords(locationX, locationY);
    
    if (currentPath.length > 0) {
      const lastPoint = currentPath[currentPath.length - 1];
      const distance = Math.sqrt(
        Math.pow(svgCoords.x - lastPoint.x, 2) + 
        Math.pow(svgCoords.y - lastPoint.y, 2)
      );
      
      if (distance < 5) return;
    }
    
    setCurrentPath(prev => [...prev, svgCoords]);
  };

  const handleTouchEnd = () => {
    if (currentPath.length > 1) {
      const pathString = smoothPath(currentPath);
      setPaths(prev => [...prev, { d: pathString, color: isEraser ? '#FFFFFF' : color, strokeWidth }]);
    }
    setIsDrawing(false);
    setCurrentPath([]);
  };

  const smoothPath = (points) => {
    if (points.length < 2) return '';
    
    let path = `M${points[0].x},${points[0].y}`;
    
    for (let i = 1; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      path += ` Q${points[i].x},${points[i].y} ${xc},${yc}`;
    }
    
    if (points.length > 1) {
      const last = points[points.length - 1];
      path += ` L${last.x},${last.y}`;
    }
    
    return path;
  };

  const currentPathString = currentPath.length > 0 
    ? smoothPath(currentPath)
    : '';

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onNavigate}>
        <Text style={styles.backButtonText}>← Geri</Text>
      </TouchableOpacity>

      <View 
        style={styles.canvasArea}
        onLayout={onLayout}
        onStartShouldSetResponder={() => true}
        onResponderGrant={handleTouchStart}
        onResponderMove={handleTouchMove}
        onResponderRelease={handleTouchEnd}
      >
        <Svg 
          height="100%" 
          width="100%" 
          viewBox={`0 0 ${SVG_VIEW_WIDTH} ${SVG_VIEW_HEIGHT}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <Defs>
            <ClipPath id="hayvanMaskesi">
              <Path d={
                selectedAnimal === 'aslan' ? ASLAN_GOVDE_YOLU : 
                selectedAnimal === 'kedi' ? KEDI_GOVDE_YOLU : 
                selectedAnimal === 'kopek' ? KOPEK_GOVDE_YOLU : 
                selectedAnimal === 'kus' ? KUS_GOVDE_YOLU :
                selectedAnimal === 'kurt' ? KURT_GOVDE_YOLU :
                selectedAnimal === 'maymun' ? MAYMUN_GOVDE_YOLU :
                selectedAnimal === 'fil' ? FIL_GOVDE_YOLU :
                selectedAnimal === 'inek' ? INEK_GOVDE_YOLU :
                selectedAnimal === 'kartal' ? KARTAL_GOVDE_YOLU :
                selectedAnimal === 'balik' ? BALIK_GOVDE_YOLU :
                selectedAnimal === 'ayi' ? AYI_GOVDE_YOLU :
                selectedAnimal === 'balina' ? BALINA_GOVDE_YOLU :
                selectedAnimal === 'tavsan' ? TAVSAN_GOVDE_YOLU :
                selectedAnimal === 'bibalik' ? BIBALIK_GOVDE_YOLU :
                selectedAnimal === 'yildiz' ? YILDIZ_GOVDE_YOLU :
                selectedAnimal === 'timsah' ? TIMSAH_GOVDE_YOLU :
                ZÜRAFA_GOVDE_YOLU
              } />
            </ClipPath>
          </Defs>

          <G clipPath="url(#hayvanMaskesi)">
            {paths.map((item, index) => (
              <Path 
                key={index} 
                d={item.d} 
                stroke={item.color} 
                strokeWidth={item.strokeWidth}
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            ))}
            {currentPathString && (
              <Path 
                d={currentPathString} 
                stroke={isEraser ? '#FFFFFF' : color} 
                strokeWidth={strokeWidth} 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            )}
          </G>
          
          {selectedAnimal === 'aslan' ? <AslanSiyahCizgiler /> : 
           selectedAnimal === 'kedi' ? <KediSiyahCizgiler /> : 
           selectedAnimal === 'kopek' ? <KopekSiyahCizgiler /> : 
           selectedAnimal === 'kus' ? <KusSiyahCizgiler /> :
           selectedAnimal === 'kurt' ? <KurtSiyahCizgiler /> :
           selectedAnimal === 'maymun' ? <MaymunSiyahCizgiler /> :
           selectedAnimal === 'fil' ? <FilSiyahCizgiler /> :
           selectedAnimal === 'inek' ? <InekSiyahCizgiler /> :
           selectedAnimal === 'kartal' ? <KartalSiyahCizgiler /> :
           selectedAnimal === 'balik' ? <BalikSiyahCizgiler /> :
           selectedAnimal === 'ayi' ? <AyiSiyahCizgiler /> :
           selectedAnimal === 'balina' ? <BalinaSiyahCizgiler /> :
           selectedAnimal === 'tavsan' ? <TavsanSiyahCizgiler /> :
           selectedAnimal === 'bibalik' ? <BibalikSiyahCizgiler /> :
           selectedAnimal === 'yildiz' ? <YildizSiyahCizgiler /> :
           selectedAnimal === 'timsah' ? <TimsahSiyahCizgiler /> :
           <ZürafaSiyahCizgiler />}
        </Svg>
      </View>

      <TouchableOpacity 
        style={[styles.toggleButton, isPanelOpen && styles.toggleButtonOpen]} 
        onPress={togglePanel}
      >
        <Text style={styles.toggleIcon}>{isPanelOpen ? '→' : '←'}</Text>
      </TouchableOpacity>

      <Animated.View 
        style={[
          styles.sidePanel, 
          { transform: [{ translateX: panelTranslateX }] }
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Hayvan Seçimi */}
          <Text style={styles.sectionTitle}>Hayvan Seç</Text>
          <View style={styles.animalSelection}>
            <TouchableOpacity 
              style={[styles.animalButton, selectedAnimal === 'aslan' && styles.animalButtonActive]} 
              onPress={() => {
                setSelectedAnimal('aslan');
                setPaths([]);
              }}
            >
              <Text style={styles.animalIcon}>🦁</Text>
              <Text style={styles.animalText}>Aslan</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.animalButton, selectedAnimal === 'kedi' && styles.animalButtonActive]} 
              onPress={() => {
                setSelectedAnimal('kedi');
                setPaths([]);
              }}
            >
              <Text style={styles.animalIcon}>🐱</Text>
              <Text style={styles.animalText}>Kedi</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.animalButton, selectedAnimal === 'kopek' && styles.animalButtonActive]} 
              onPress={() => {
                setSelectedAnimal('kopek');
                setPaths([]);
              }}
            >
              <Text style={styles.animalIcon}>🐕</Text>
              <Text style={styles.animalText}>Köpek</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.animalButton, selectedAnimal === 'kus' && styles.animalButtonActive]} 
              onPress={() => {
                setSelectedAnimal('kus');
                setPaths([]);
              }}
            >
              <Text style={styles.animalIcon}>🐦</Text>
              <Text style={styles.animalText}>Kuş</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.animalButton, selectedAnimal === 'kurt' && styles.animalButtonActive]} 
              onPress={() => {
                setSelectedAnimal('kurt');
                setPaths([]);
              }}
            >
              <Text style={styles.animalIcon}>🐺</Text>
              <Text style={styles.animalText}>Kurt</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.animalButton, selectedAnimal === 'maymun' && styles.animalButtonActive]} 
              onPress={() => {
                setSelectedAnimal('maymun');
                setPaths([]);
              }}
            >
              <Text style={styles.animalIcon}>🐵</Text>
              <Text style={styles.animalText}>Maymun</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.animalButton, selectedAnimal === 'fil' && styles.animalButtonActive]} 
              onPress={() => {
                setSelectedAnimal('fil');
                setPaths([]);
              }}
            >
              <Text style={styles.animalIcon}>🐘</Text>
              <Text style={styles.animalText}>Fil</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.animalButton, selectedAnimal === 'inek' && styles.animalButtonActive]} 
              onPress={() => {
                setSelectedAnimal('inek');
                setPaths([]);
              }}
            >
              <Text style={styles.animalIcon}>🐄</Text>
              <Text style={styles.animalText}>İnek</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.animalButton, selectedAnimal === 'kartal' && styles.animalButtonActive]} 
              onPress={() => {
                setSelectedAnimal('kartal');
                setPaths([]);
              }}
            >
              <Text style={styles.animalIcon}>🦅</Text>
              <Text style={styles.animalText}>Kartal</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.animalButton, selectedAnimal === 'balik' && styles.animalButtonActive]} 
              onPress={() => {
                setSelectedAnimal('balik');
                setPaths([]);
              }}
            >
              <Text style={styles.animalIcon}>🐟</Text>
              <Text style={styles.animalText}>Balık</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.animalButton, selectedAnimal === 'ayi' && styles.animalButtonActive]} 
              onPress={() => {
                setSelectedAnimal('ayi');
                setPaths([]);
              }}
            >
              <Text style={styles.animalIcon}>🐻</Text>
              <Text style={styles.animalText}>Ayı</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.animalButton, selectedAnimal === 'balina' && styles.animalButtonActive]} 
              onPress={() => {
                setSelectedAnimal('balina');
                setPaths([]);
              }}
            >
              <Text style={styles.animalIcon}>🐋</Text>
              <Text style={styles.animalText}>Balina</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.animalButton, selectedAnimal === 'tavsan' && styles.animalButtonActive]} 
              onPress={() => {
                setSelectedAnimal('tavsan');
                setPaths([]);
              }}
            >
              <Text style={styles.animalIcon}>🐰</Text>
              <Text style={styles.animalText}>Tavşan</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.animalButton, selectedAnimal === 'bibalik' && styles.animalButtonActive]} 
              onPress={() => {
                setSelectedAnimal('bibalik');
                setPaths([]);
              }}
            >
              <Text style={styles.animalIcon}>🦈</Text>
              <Text style={styles.animalText}>Köpekbalığı</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.animalButton, selectedAnimal === 'yildiz' && styles.animalButtonActive]} 
              onPress={() => {
                setSelectedAnimal('yildiz');
                setPaths([]);
              }}
            >
              <Text style={styles.animalIcon}>⭐</Text>
              <Text style={styles.animalText}>Yıldız</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.animalButton, selectedAnimal === 'timsah' && styles.animalButtonActive]} 
              onPress={() => {
                setSelectedAnimal('timsah');
                setPaths([]);
              }}
            >
              <Text style={styles.animalIcon}>🐊</Text>
              <Text style={styles.animalText}>Timsah</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.animalButton, selectedAnimal === 'zürafa' && styles.animalButtonActive]} 
              onPress={() => {
                setSelectedAnimal('zürafa');
                setPaths([]);
              }}
            >
              <Text style={styles.animalIcon}>🦒</Text>
              <Text style={styles.animalText}>Zürafa</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.selectedColorDisplay}>
            <View style={[
              styles.selectedColorCircle, 
              { backgroundColor: isEraser ? '#FFFFFF' : color },
              isEraser && styles.whiteColor
            ]} />
            <Text style={styles.sectionTitle}>{isEraser ? 'Silgi Modu' : 'Seçili Renk'}</Text>
          </View>

          <Text style={styles.sectionTitle}>Fırça Kalınlığı</Text>
          <View style={styles.brushSizeContainer}>
            <View style={styles.brushSizeHeader}>
              <Text style={styles.brushLabel}>
                {strokeWidth <= 30 ? 'İnce' : strokeWidth <= 50 ? 'Orta' : strokeWidth <= 70 ? 'Kalın' : 'Çok Kalın'}
              </Text>
              <Text style={styles.brushSizeValue}>{Math.round(strokeWidth)}px</Text>
            </View>
            
            <View style={styles.brushPreviewContainer}>
              <View style={[
                styles.brushPreviewLarge, 
                { 
                  width: strokeWidth, 
                  height: strokeWidth,
                  backgroundColor: isEraser ? '#999' : color 
                }
              ]} />
            </View>

            <Slider
              style={styles.slider}
              minimumValue={20}
              maximumValue={120}
              value={strokeWidth}
              onValueChange={setStrokeWidth}
              minimumTrackTintColor="#2196F3"
              maximumTrackTintColor="#ddd"
              thumbTintColor="#2196F3"
              step={5}
            />
          </View>

          <Text style={styles.sectionTitle}>Renkler</Text>
          <View style={styles.colorGrid}>
            {colors.map((c) => (
              <TouchableOpacity 
                key={c} 
                style={[
                  styles.colorBtn, 
                  { backgroundColor: c },
                  color === c && !isEraser && styles.selectedColor,
                  c === '#FFFFFF' && styles.whiteColor
                ]} 
                onPress={() => {
                  setColor(c);
                  setIsEraser(false);
                }} 
              />
            ))}
          </View>

          <Text style={styles.sectionTitle}>Araçlar</Text>
          
          <TouchableOpacity 
            style={[styles.toolButton, styles.eraserButton, isEraser && styles.eraserActive]} 
            onPress={toggleEraser}
          >
            <Text style={styles.toolIcon}>🧹</Text>
            <Text style={styles.toolText}>{isEraser ? 'Silgi Aktif' : 'Silgi'}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.toolButton, paths.length === 0 && styles.toolButtonDisabled]} 
            onPress={undoLastPath}
            disabled={paths.length === 0}
          >
            <Text style={styles.toolIcon}>↶</Text>
            <Text style={styles.toolText}>Geri Al ({paths.length})</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.toolButton, styles.clearButton]} 
            onPress={clearAll}
          >
            <Text style={styles.toolIcon}>🗑️</Text>
            <Text style={styles.toolText}>Tümünü Temizle</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.toolButton, styles.saveButton]} 
            onPress={() => alert('Resim kaydedildi!')}
          >
            <Text style={styles.toolIcon}>💾</Text>
            <Text style={styles.toolText}>Kaydet</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f0f0f0' 
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 3,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  canvasArea: { 
    flex: 1,
    backgroundColor: 'white', 
    margin: 15,
    marginTop: 100,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  toggleButton: {
    position: 'absolute',
    right: 0,
    top: '50%',
    backgroundColor: '#4CAF50',
    width: 40,
    height: 80,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 5,
  },
  toggleButtonOpen: {
    right: 300,
  },
  toggleIcon: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  sidePanel: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  selectedColorDisplay: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
  },
  selectedColorCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#333',
    marginBottom: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  colorBtn: { 
    width: 45, 
    height: 45, 
    borderRadius: 22.5, 
    borderWidth: 2,
    borderColor: '#ddd',
    elevation: 2,
  },
  whiteColor: {
    borderColor: '#999',
    borderWidth: 2,
  },
  selectedColor: {
    borderColor: '#333',
    borderWidth: 4,
    transform: [{ scale: 1.1 }]
  },
  toolButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 3,
  },
  toolButtonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.5,
  },
  clearButton: {
    backgroundColor: '#FF4444',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  eraserButton: {
    backgroundColor: '#607D8B',
  },
  eraserActive: {
    backgroundColor: '#FF5722',
  },
  toolIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  toolText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  brushSizeContainer: {
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 15,
  },
  brushSizeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  brushSizeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  brushPreviewContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  brushPreviewLarge: {
    borderRadius: 100,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  brushLabel: {
    fontSize: 11,
    color: '#666',
    fontWeight: 'bold',
  },
  animalSelection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },
  animalButton: {
    width: '30%',
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  animalButtonActive: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
  },
  animalIcon: {
    fontSize: 24,
    marginBottom: 3,
  },
  animalText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
  },
});
