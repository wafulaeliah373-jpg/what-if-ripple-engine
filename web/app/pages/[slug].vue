<script setup lang="ts">
import { sanityImageUrl } from '~/utils/sanityImage'

const route = useRoute()
const query =
  '*[_type == "whatIf" && slug.current == $slug][0] { _id, title, slug, summary, body, image, ripples[] { horizon, consequence } }'
const { data: story } = await useSanityQuery(query, {
  slug: String(route.params.slug ?? ''),
})
const coverImage = computed(() => sanityImageUrl(story.value?.image, 1600))
const activeRipple = ref(0)
const rippleHorizons = [
  { horizon: 'The first day', prompt: 'Who notices first, and what part of ordinary life changes before tomorrow?' },
  { horizon: 'One year later', prompt: 'Which institution adapts, who gains an advantage, and who pays for the change?' },
  { horizon: 'Generations later', prompt: 'What once felt impossible has become ordinary, and what new problem has it left behind?' },
]
const rippleStages = computed(() => rippleHorizons.map((stage) => ({
  ...stage,
  consequence: story.value?.ripples?.find((ripple) => ripple.horizon === stage.horizon)?.consequence ?? stage.prompt,
})))
const selectedRipple = computed(() => rippleStages.value[activeRipple.value])
</script>

<template>
  <main class="article-page">
    <header class="topbar">
      <NuxtLink to="/" class="brand" aria-label="What If home">
        <span class="brand-mark">?</span>
        <span>WHAT IF</span>
      </NuxtLink>
      <NuxtLink to="/" class="back-link"><span>←</span> All questions</NuxtLink>
    </header>

    <article v-if="story" class="article">
      <p class="eyebrow">A THOUGHT EXPERIMENT <span>— WHAT IF</span></p>
      <h1>{{ story.title }}</h1>
      <p class="lede">{{ story.summary }}</p>
      <img v-if="coverImage" class="cover-image" :src="coverImage" :alt="story.title" />
      <div class="article-rule"><span>THE POSSIBILITY</span><span>✳</span></div>
      <div class="story-body">
        <SanityContent :value="story.body" />
      </div>
      <section class="ripple-engine" aria-labelledby="ripple-title">
        <div class="ripple-heading">
          <p class="ripple-label">A SANITY-POWERED THOUGHT EXPERIMENT</p>
          <h2 id="ripple-title">Follow the ripple.</h2>
          <p>One impossible change. Three moments in a world learning to live with it.</p>
        </div>
        <div class="ripple-tabs" role="tablist" aria-label="Choose a point in the future">
          <button
            v-for="(ripple, index) in rippleStages"
            :key="`${ripple.horizon}-${index}`"
            type="button"
            role="tab"
            :aria-selected="activeRipple === index"
            :class="{ active: activeRipple === index }"
            @click="activeRipple = index"
          >
            <span>0{{ index + 1 }}</span>
            {{ ripple.horizon }}
          </button>
        </div>
        <div v-if="selectedRipple" class="ripple-result" role="tabpanel" aria-live="polite">
          <span class="ripple-star" aria-hidden="true">✳</span>
          <p class="ripple-time">{{ selectedRipple.horizon }}</p>
          <p class="ripple-consequence">{{ selectedRipple.consequence }}</p>
        </div>
      </section>
      <NuxtLink to="/" class="return-link">← Back to all questions</NuxtLink>
    </article>

    <section v-else class="not-found">
      <p class="eyebrow">THIS QUESTION IS STILL OUT THERE</p>
      <h1>We couldn’t find that possibility.</h1>
      <NuxtLink to="/">Return to the question board →</NuxtLink>
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
:global(body) { margin: 0; background: #f1f0e8; color: #17241e; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
:global(a) { color: inherit; }
.article-page { min-height: 100vh; background: #f1f0e8; }
.topbar { width: min(1180px, calc(100% - 64px)); height: 82px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
.brand { display: inline-flex; align-items: center; gap: 10px; color: #17241e; text-decoration: none; font-size: 13px; font-weight: 850; letter-spacing: .14em; }
.brand-mark { width: 31px; height: 31px; display: grid; place-items: center; border-radius: 50%; background: #c9ef65; color: #17241e; font-size: 20px; font-weight: 800; letter-spacing: 0; }
.back-link { display: inline-flex; gap: 9px; align-items: center; text-decoration: none; font-size: 12px; font-weight: 750; }
.back-link span { color: #6f8b37; font-size: 18px; }
.article { width: min(820px, calc(100% - 40px)); margin: 0 auto; padding: 68px 0 108px; }
.eyebrow { margin: 0; color: #7b8777; font-size: 10px; font-weight: 850; letter-spacing: .16em; }
.eyebrow span { color: #bd805d; }
h1 { max-width: 820px; margin: 24px 0 20px; color: #17241e; font-size: clamp(44px, 8vw, 88px); line-height: .98; letter-spacing: -.075em; }
.lede { max-width: 620px; margin: 0; color: #69766b; font-family: Georgia, "Times New Roman", serif; font-size: clamp(19px, 2.6vw, 25px); line-height: 1.55; }
.cover-image { width: 100%; max-height: 490px; margin: 42px 0 30px; display: block; object-fit: cover; }
.article-rule { margin: 36px 0 28px; padding: 16px 0; display: flex; justify-content: space-between; border-top: 1px solid #d6d9cd; border-bottom: 1px solid #d6d9cd; color: #829079; font-size: 9px; font-weight: 850; letter-spacing: .17em; }
.article-rule span:last-child { color: #c17e58; font-size: 16px; }
.story-body { max-width: 680px; color: #334239; font-size: 17px; line-height: 1.85; }
.story-body :deep(h2) { margin: 2em 0 .5em; color: #17241e; font-size: 30px; line-height: 1.2; letter-spacing: -.04em; }
.story-body :deep(p) { margin: 0 0 1.2em; }
.story-body :deep(blockquote) { margin: 28px 0; padding-left: 22px; border-left: 3px solid #c9ef65; color: #617061; font-family: Georgia, serif; font-size: 21px; }
.ripple-engine { margin-top: 74px; padding: clamp(26px, 5vw, 48px); background: #14241e; color: #f5f1e7; }
.ripple-heading { max-width: 520px; }
.ripple-label { margin: 0; color: #c9ef65; font-size: 9px; font-weight: 850; letter-spacing: .17em; }
.ripple-heading h2 { margin: 14px 0 8px; font-size: clamp(32px, 5vw, 48px); line-height: 1; letter-spacing: -.06em; }
.ripple-heading > p:last-child { margin: 0; color: #b5c3ba; font-size: 13px; line-height: 1.7; }
.ripple-tabs { margin-top: 30px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: 1px solid #ffffff2b; border-bottom: 1px solid #ffffff2b; }
.ripple-tabs button { min-height: 68px; padding: 12px 10px; border: 0; border-right: 1px solid #ffffff2b; background: transparent; color: #aab8ad; text-align: left; font: inherit; font-size: 11px; cursor: pointer; }
.ripple-tabs button:last-child { border-right: 0; }
.ripple-tabs button span { margin-right: 8px; color: #718379; font-size: 9px; font-weight: 850; letter-spacing: .1em; }
.ripple-tabs button.active { background: #c9ef6512; color: #f5f1e7; box-shadow: inset 0 -2px #c9ef65; }
.ripple-tabs button.active span { color: #c9ef65; }
.ripple-tabs button:focus-visible { outline: 2px solid #c9ef65; outline-offset: -3px; }
.ripple-result { min-height: 160px; padding-top: 25px; position: relative; }
.ripple-star { position: absolute; top: 20px; right: 0; color: #ef9668; font-size: 24px; }
.ripple-time { margin: 0 0 9px; color: #c9ef65; font-size: 10px; font-weight: 850; letter-spacing: .15em; text-transform: uppercase; }
.ripple-consequence { max-width: 620px; margin: 0; color: #f5f1e7; font-family: Georgia, "Times New Roman", serif; font-size: clamp(19px, 2.7vw, 26px); line-height: 1.55; }
.return-link { margin-top: 46px; display: inline-block; color: #415b30; font-size: 12px; font-weight: 850; text-underline-offset: 5px; }
.not-found { width: min(820px, calc(100% - 40px)); min-height: 65vh; margin: 0 auto; padding: 120px 0; }
.not-found h1 { max-width: 700px; font-size: clamp(46px, 7vw, 76px); }
.not-found a { display: inline-block; margin-top: 10px; font-size: 13px; font-weight: 800; text-underline-offset: 4px; }
.footer { width: min(1180px, calc(100% - 64px)); min-height: 84px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #d8dacf; }
.footer p, .footer > span { color: #788174; font-size: 11px; }
.footer > span { font-size: 9px; font-weight: 800; letter-spacing: .16em; }
.footer-brand { display: flex; flex-direction: column; align-items: flex-start; }
.author-credit { margin: 5px 0 0 41px; color: #2878b8; font-size: 10px; }
@media (max-width: 680px) {
  .topbar, .footer { width: calc(100% - 36px); }
  .article { padding-top: 53px; }
  .ripple-tabs button { padding: 10px 7px; font-size: 10px; }
  .ripple-tabs button span { display: block; margin: 0 0 5px; }
  .footer { gap: 12px; flex-wrap: wrap; padding: 20px 0; }
}
</style>

