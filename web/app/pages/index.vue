<script setup lang="ts">
import { sanityImageUrl } from '~/utils/sanityImage'

const query =
  '*[_type == "whatIf" && defined(slug.current)] | order(_createdAt desc) { _id, title, slug, summary, image }'
const { data: whatIfs, pending, error } = await useSanityQuery(query)
</script>

<template>
  <main class="page">
    <header class="topbar">
      <NuxtLink to="/" class="brand" aria-label="What If home">
        <span class="brand-mark">?</span>
        <span>WHAT IF</span>
      </NuxtLink>
      <a class="top-link" href="#questions">Explore the unknown <span>↘</span></a>
    </header>

    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow"><span class="pulse"></span> A playground for possibility</p>
        <h1>What if the<br /><span>impossible</span><br />was next?</h1>
        <p class="intro">
          Big futures begin with small questions. Follow the ideas that take one “what if” and
          imagine a whole new world.
        </p>
        <a class="hero-cta" href="#questions">Explore the questions <span>↓</span></a>
      </div>

      <div class="hero-art" aria-hidden="true">
        <div class="orbit orbit-one"></div>
        <div class="orbit orbit-two"></div>
        <div class="orbit orbit-three"></div>
        <div class="spark spark-one">✳</div>
        <div class="spark spark-two">✳</div>
        <div class="core">?</div>
        <div class="art-note">IMAGINE<br />OTHERWISE</div>
        <div class="art-caption">EVERY POSSIBILITY<br />STARTS SOMEWHERE</div>
      </div>

      <div class="hero-foot"><span>01 — OPEN QUESTIONS</span><span>SCROLL TO EXPLORE ↓</span></div>
    </section>

    <section id="questions" class="questions">
      <div class="section-heading">
        <div>
          <p class="section-label">THE QUESTION BOARD <span>— 01</span></p>
          <h2>Pick a possibility.</h2>
        </div>
        <p class="section-note">Stories from the edge of reality, written one question at a time.</p>
      </div>

      <div v-if="whatIfs?.length" class="story-grid">
        <NuxtLink
          v-for="(story, index) in whatIfs"
          :key="story._id"
          :to="'/' + story.slug.current"
          class="story-card"
        >
          <div class="card-art">
            <img
              v-if="story.image?.asset?._ref"
              :src="sanityImageUrl(story.image, 1000)"
              :alt="story.title"
              loading="lazy"
            />
            <div v-else class="card-placeholder">
              <span>WHAT IF</span>
              <strong>{{ String(index + 1).padStart(2, '0') }}</strong>
            </div>
            <span class="card-arrow">↗</span>
          </div>
          <div class="card-copy">
            <p class="card-kicker">THOUGHT EXPERIMENT <span>· {{ String(index + 1).padStart(2, '0') }}</span></p>
            <h3>{{ story.title }}</h3>
            <p class="summary">{{ story.summary }}</p>
            <span class="read-link">Follow the idea <span>→</span></span>
          </div>
        </NuxtLink>
      </div>

      <div v-else-if="pending" class="empty-state" aria-live="polite">
        <div class="empty-mark">?</div>
        <div>
          <p class="section-label">LOADING QUESTIONS</p>
          <h3>Gathering possibilities…</h3>
          <p>The question board is loading.</p>
        </div>
      </div>

      <div v-else-if="error" class="empty-state" role="status">
        <div class="empty-mark">?</div>
        <div>
          <p class="section-label">THE QUESTION BOARD</p>
          <h3>Questions could not load just now.</h3>
          <p>Please try again in a moment.</p>
        </div>
      </div>

      <div v-else class="empty-state">
        <div class="empty-mark">?</div>
        <div>
          <p class="section-label">THE FIRST QUESTION</p>
          <h3>The board is yours to imagine.</h3>
          <p>Publish your first What If in Sanity Studio and it will appear here.</p>
          <a href="http://localhost:3333" target="_blank" rel="noreferrer">Open the Studio ↗</a>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="footer-brand">
        <NuxtLink to="/" class="brand"><span class="brand-mark">?</span><span>WHAT IF</span></NuxtLink>
        <span class="author-credit">by Eliah Festus Wafula</span>
      </div>
      <p>Curiosity is a good place to start.</p>
      <span>© WHAT IF</span>
    </footer>
  </main>
</template>

<style scoped>
:global(*) { box-sizing: border-box; }
:global(html) { scroll-behavior: smooth; }
:global(body) { margin: 0; background: #f1f0e8; color: #17241e; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
:global(a) { color: inherit; }
.page { min-height: 100vh; overflow: hidden; background: #f1f0e8; }
.topbar { width: min(1320px, calc(100% - 64px)); height: 82px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
.brand { display: inline-flex; align-items: center; gap: 10px; color: #17241e; text-decoration: none; font-size: 13px; font-weight: 850; letter-spacing: .14em; }
.brand-mark { width: 31px; height: 31px; display: grid; place-items: center; border-radius: 50%; background: #c9ef65; color: #17241e; font-size: 20px; font-weight: 800; letter-spacing: 0; }
.top-link { text-decoration: none; font-size: 13px; font-weight: 650; }
.top-link span { margin-left: 10px; color: #658324; }
.hero { width: min(1440px, calc(100% - 32px)); min-height: 610px; margin: 0 auto; padding: clamp(42px, 7vw, 94px) clamp(32px, 8vw, 116px) 54px; position: relative; display: grid; grid-template-columns: 1.05fr .95fr; align-items: center; overflow: hidden; border-radius: 8px; background: #14241e; color: #f5f1e7; }
.hero-copy { position: relative; z-index: 2; max-width: 650px; }
.eyebrow, .section-label, .card-kicker { margin: 0; font-size: 10px; font-weight: 800; letter-spacing: .17em; }
.eyebrow { display: flex; align-items: center; gap: 10px; color: #c4d2c7; text-transform: uppercase; }
.pulse { width: 7px; height: 7px; border-radius: 50%; background: #c9ef65; box-shadow: 0 0 0 5px #c9ef651c; }
h1 { margin: 30px 0 24px; font-size: clamp(58px, 8vw, 112px); line-height: .91; letter-spacing: -.085em; font-weight: 770; }
h1 span { color: #c9ef65; font-family: Georgia, "Times New Roman", serif; font-weight: 400; font-style: italic; letter-spacing: -.075em; }
.intro { max-width: 410px; margin: 0; color: #b5c3ba; font-size: 16px; line-height: 1.7; }
.hero-cta { width: fit-content; margin-top: 34px; padding: 14px 17px; display: flex; align-items: center; gap: 28px; border-radius: 2px; background: #c9ef65; color: #17241e; text-decoration: none; font-size: 12px; font-weight: 800; }
.hero-cta span { font-size: 18px; line-height: 12px; }
.hero-art { min-height: 440px; position: relative; display: grid; place-items: center; }
.orbit { position: absolute; left: 50%; top: 49%; border: 1px solid #e0e9d22a; border-radius: 50%; transform: translate(-50%, -50%) rotate(-26deg); }
.orbit-one { width: 300px; height: 420px; }
.orbit-two { width: 440px; height: 300px; transform: translate(-50%, -50%) rotate(28deg); }
.orbit-three { width: 520px; height: 180px; transform: translate(-50%, -50%) rotate(-10deg); }
.core { width: 180px; height: 180px; display: grid; place-items: center; border-radius: 50%; background: radial-gradient(circle at 35% 28%, #efffae, #c9ef65 45%, #87aa39); color: #17241e; font-family: Georgia, serif; font-size: 118px; line-height: 1; box-shadow: 0 22px 80px #c9ef6530; transform: rotate(-8deg); }
.spark { position: absolute; z-index: 1; color: #c9ef65; font-size: 30px; }
.spark-one { top: 11%; right: 14%; }
.spark-two { left: 6%; bottom: 18%; color: #f0996c; font-size: 21px; }
.art-note { position: absolute; top: 13%; left: 6%; padding: 11px 14px; background: #ef9668; color: #14241e; font-size: 9px; font-weight: 900; line-height: 1.35; letter-spacing: .12em; transform: rotate(-8deg); }
.art-caption { position: absolute; right: 0; bottom: 9%; color: #96a79b; font-size: 9px; font-weight: 750; line-height: 1.6; letter-spacing: .16em; }
.hero-foot { position: absolute; right: clamp(32px, 8vw, 116px); bottom: 25px; left: clamp(32px, 8vw, 116px); display: flex; justify-content: space-between; color: #718379; font-size: 9px; font-weight: 750; letter-spacing: .15em; }
.questions { width: min(1180px, calc(100% - 64px)); margin: 0 auto; padding: 106px 0 120px; }
.section-heading { display: flex; align-items: end; justify-content: space-between; gap: 28px; margin-bottom: 38px; }
.section-label { color: #748174; }
.section-label span { color: #ad8b62; }
.section-heading h2 { margin: 12px 0 0; font-size: clamp(35px, 5vw, 57px); letter-spacing: -.06em; line-height: 1; }
.section-note { max-width: 300px; margin: 0 0 3px; color: #717c72; font-size: 13px; line-height: 1.65; }
.story-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.story-card { min-width: 0; display: block; overflow: hidden; border: 1px solid #ddded2; background: #f7f6f0; color: inherit; text-decoration: none; transition: transform .2s ease, box-shadow .2s ease; }
.story-card:hover { transform: translateY(-5px); box-shadow: 0 18px 38px #17241e14; }
.card-art { height: 230px; position: relative; overflow: hidden; background: #e6e5d9; }
.card-art img { width: 100%; height: 100%; display: block; object-fit: cover; }
.card-placeholder { width: 100%; height: 100%; padding: 23px; display: flex; align-items: flex-start; justify-content: space-between; background: radial-gradient(circle at 80% 30%, #d1e787, #b6c477 25%, #e3c3a6 25%, #e3c3a6 48%, #e9e7d8 48%); color: #23362a; font-size: 9px; font-weight: 850; letter-spacing: .17em; }
.card-placeholder strong { margin-top: 90px; font-family: Georgia, serif; font-size: 56px; font-weight: 400; letter-spacing: -.06em; }
.card-arrow { position: absolute; right: 13px; bottom: 13px; width: 34px; height: 34px; display: grid; place-items: center; border-radius: 50%; background: #f6f3e9; font-size: 17px; }
.card-copy { padding: 25px 23px 27px; }
.card-kicker { color: #829079; font-size: 9px; }
.card-kicker span { color: #c17e58; }
.card-copy h3 { min-height: 60px; margin: 16px 0 10px; font-size: 23px; line-height: 1.15; letter-spacing: -.04em; }
.summary { min-height: 61px; margin: 0; color: #6f786d; font-size: 13px; line-height: 1.6; }
.read-link { margin-top: 22px; display: inline-flex; gap: 10px; font-size: 11px; font-weight: 800; }
.read-link span { color: #779331; font-size: 16px; line-height: 12px; }
.empty-state { min-height: 250px; padding: 38px; display: flex; align-items: center; gap: 28px; border: 1px solid #d9dbcf; background: #f7f6f0; }
.empty-mark { width: 94px; height: 94px; flex: 0 0 94px; display: grid; place-items: center; border-radius: 50%; background: #d8e6ad; font-family: Georgia, serif; font-size: 64px; }
.empty-state h3 { margin: 12px 0 8px; font-size: 25px; letter-spacing: -.04em; }
.empty-state p:not(.section-label) { margin: 0 0 14px; color: #747d71; font-size: 13px; }
.empty-state a { font-size: 12px; font-weight: 800; text-underline-offset: 4px; }
.footer { width: min(1180px, calc(100% - 64px)); min-height: 84px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #d8dacf; }
.footer p, .footer > span { color: #788174; font-size: 11px; }
.footer > span { font-size: 9px; font-weight: 800; letter-spacing: .16em; }
.footer-brand { display: flex; flex-direction: column; align-items: flex-start; }
.author-credit { margin: 5px 0 0 41px; color: #2878b8; font-size: 10px; }
@media (max-width: 780px) {
  .topbar, .questions, .footer { width: calc(100% - 36px); }
  .hero { width: calc(100% - 16px); min-height: unset; grid-template-columns: 1fr; padding: 48px 28px 68px; }
  h1 { font-size: clamp(58px, 17vw, 94px); }
  .hero-art { min-height: 310px; margin-top: 12px; }
  .core { width: 138px; height: 138px; font-size: 90px; }
  .orbit-one { width: 230px; height: 320px; }
  .orbit-two { width: 340px; height: 230px; }
  .orbit-three { width: 400px; }
  .hero-foot { right: 28px; left: 28px; bottom: 22px; font-size: 8px; }
  .questions { padding: 75px 0; }
  .section-heading { display: block; }
  .section-note { margin-top: 18px; }
  .story-grid { grid-template-columns: 1fr; }
  .card-art { height: 245px; }
  .empty-state { padding: 25px; align-items: flex-start; }
  .empty-mark { width: 58px; height: 58px; flex-basis: 58px; font-size: 39px; }
  .footer { gap: 12px; flex-wrap: wrap; padding: 20px 0; }
}
</style>

