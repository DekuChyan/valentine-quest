# 💝 Content Customization Guide

## Quick Start

### Step 1: Add Your Media Files

1. **Images** (`static/images/`):
   - heartbeat.png
   - sunrise.png  
   - myanimeform.png
   
2. **Audio** (`static/audio/`):
   - hello.mp3
   
3. **Video** (`static/video/`):
   - iloveyou.mov

**Tips:**
- Keep images under 2MB
- Keep audio under 5MB
- Keep video under 10MB
- Use online compressors if needed (tinypng.com, handbrake.fr)

### Step 2: Edit Story Content

Open each `story_X.html` file and replace the placeholder text with your personal stories.

#### Story 1: Beginning
Theme: First moments, how you met
Example question: "What did you feel when we first...?"

#### Story 2: Memories
Theme: Special moments together
Example question: "Which moment meant the most to you?"

#### Story 3: Daily Life
Theme: Your routines and little things
Example question: "What makes our ordinary days special?"

#### Story 4: Future
Theme: Dreams and plans together
Example question: "What do you dream about for our future?"

#### Story 5: Love Definition
Theme: What love means
Example question: "What does love mean to you?"

### Step 3: Add Media to HTML

#### To add an image:
```html
<img src="{{ url_for('static', filename='images/heartbeat.png') }}" alt="Our love">
```

#### To add audio:
```html
<audio controls>
    <source src="{{ url_for('static', filename='audio/hello.mp3') }}" type="audio/mpeg">
</audio>
```

#### To add video:
```html
<video controls>
    <source src="{{ url_for('static', filename='video/iloveyou.mov') }}" type="video/mp4">
</video>
```

### Step 4: Customize the Finale

Open `templates/finale.html` and:
1. Change the main question
2. Add your final message
3. Include special media (video/audio)
4. Write your heartfelt message

### Step 5: Change Colors (Optional)

Edit `static/css/style.css`:
```css
:root {
    --primary-color: #ff6b9d;    /* Main pink */
    --secondary-color: #ffc2d1;  /* Light pink */
    --accent-color: #ff8fab;     /* Accent */
}
```

Popular color schemes:
- Red romance: `#e63946`, `#f1faee`, `#a8dadc`
- Peach pastel: `#ffb5a7`, `#fcd5ce`, `#f8edeb`
- Lavender dream: `#b5a4ff`, `#e7c6ff`, `#f8f0ff`

## Testing Checklist

Before sharing:
- ✅ All texts personalized
- ✅ All media files added
- ✅ No spelling errors
- ✅ All buttons work
- ✅ Tested on mobile
- ✅ Final surprise works

## Tips

- **Be yourself** - write naturally
- **Add humor** - use your inside jokes
- **Keep it balanced** - not too much text per page
- **Test everything** - click all buttons, check all pages
- **Have fun!** - this is for someone you love ❤️

---

Need help? Check README.md or DEPLOYMENT.md
