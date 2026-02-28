// Pre-written templates for bulk seeding. Only prompts needed — images auto-generated via Imagen/Gemini.

export interface SeedTemplate {
  title: string;
  category: string;
  hiddenPrompt: string;
  model: string;
  creditCost: number;
  aspectRatio: string;
  tags: string[];
}

export const SEED_TEMPLATES: SeedTemplate[] = [
  // ═══════════════════════════════════════════
  // SCI-FI & FANTASY
  // ═══════════════════════════════════════════
  {
    title: "Cyberpunk Neon Cityscape",
    category: "Sci-Fi & Fantasy",
    hiddenPrompt: "A sprawling cyberpunk metropolis at night, towering skyscrapers covered in holographic advertisements and neon signs in Japanese and English, flying cars with glowing trails, rain-slicked streets reflecting pink and blue neon, massive electronic billboards, steam rising from vents, cinematic lighting, ultra detailed, 8k resolution, blade runner aesthetic",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "16:9",
    tags: ["cyberpunk", "neon", "city", "futuristic", "night"],
  },
  {
    title: "Dragon Guardian",
    category: "Sci-Fi & Fantasy",
    hiddenPrompt: "A majestic ancient dragon perched atop a crystal mountain, iridescent scales shimmering with fire and ice, massive wings spread against a twilight sky filled with two moons, glowing amber eyes, treasure hoard visible in the cave below, volumetric fog, fantasy art, highly detailed digital painting, epic scale",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "3:4",
    tags: ["dragon", "fantasy", "epic", "mythical"],
  },
  {
    title: "Space Station Sunrise",
    category: "Sci-Fi & Fantasy",
    hiddenPrompt: "Interior view of a futuristic space station observation deck, panoramic window showing Earth's sunrise from orbit, warm golden light flooding the sleek white and chrome interior, holographic displays floating in mid-air, a single astronaut silhouetted against the view, plants in hydroponic pods, ultra realistic, cinematic composition",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "16:9",
    tags: ["space", "sci-fi", "sunrise", "futuristic", "astronaut"],
  },
  {
    title: "Enchanted Forest Portal",
    category: "Sci-Fi & Fantasy",
    hiddenPrompt: "A mystical glowing portal between two ancient twisted trees in an enchanted forest, swirling energy of purple and turquoise, bioluminescent mushrooms and fireflies illuminating the mossy ground, magical runes carved into the tree bark, ethereal mist, fantasy illustration, dreamlike atmosphere, highly detailed",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "3:4",
    tags: ["fantasy", "portal", "forest", "magical", "enchanted"],
  },
  {
    title: "Mech Warrior Battle",
    category: "Sci-Fi & Fantasy",
    hiddenPrompt: "A giant bipedal mech warrior standing in a destroyed cityscape, sparks flying from battle damage, one arm is a massive plasma cannon, cockpit glowing blue, smoke and debris everywhere, dramatic low angle shot, sunset backlighting, military sci-fi, hyper detailed mechanical design, concept art quality",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "3:4",
    tags: ["mech", "robot", "battle", "sci-fi", "warrior"],
  },

  // ═══════════════════════════════════════════
  // PRODUCT PHOTOGRAPHY
  // ═══════════════════════════════════════════
  {
    title: "Luxury Perfume Bottle",
    category: "Product Photography",
    hiddenPrompt: "A luxury glass perfume bottle with gold cap on a polished marble surface, soft studio lighting with beautiful caustics through the glass, water droplets on the bottle, fresh flowers blurred in background, premium beauty product photography, clean composition, soft shadows, editorial quality, 8k commercial photography",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "3:4",
    tags: ["perfume", "luxury", "product", "beauty", "commercial"],
  },
  {
    title: "Sneaker Product Shot",
    category: "Product Photography",
    hiddenPrompt: "A fresh pair of white and neon green athletic sneakers floating in mid-air against a gradient background from white to light gray, dynamic angle showing the sole and side profile, soft studio lighting, subtle shadow beneath, crisp detail on fabric texture and stitching, commercial product photography, clean and modern",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "1:1",
    tags: ["sneakers", "shoes", "product", "footwear", "sports"],
  },
  {
    title: "Watch on Dark Surface",
    category: "Product Photography",
    hiddenPrompt: "A premium automatic watch with rose gold case and dark navy dial on a black textured leather surface, dramatic side lighting creating sharp reflections on the crystal, visible mechanical movement through exhibition caseback, shallow depth of field, luxury watch photography, rich tones, editorial quality",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "1:1",
    tags: ["watch", "luxury", "product", "accessories", "timepiece"],
  },
  {
    title: "Skincare Flat Lay",
    category: "Product Photography",
    hiddenPrompt: "A beautiful flat lay arrangement of premium skincare products — serum bottles, cream jars, and face masks — on a white marble surface surrounded by fresh eucalyptus leaves, cotton pads, and water droplets, top-down perspective, soft natural light from the side, clean minimalist aesthetic, beauty editorial photography",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "1:1",
    tags: ["skincare", "beauty", "flat-lay", "product", "minimalist"],
  },
  {
    title: "Premium Headphones",
    category: "Product Photography",
    hiddenPrompt: "Over-ear premium headphones with brushed aluminum and leather cushions, floating at a slight angle against a clean dark gradient background, dramatic rim lighting highlighting the curves and materials, subtle reflection below, ultra sharp detail on every texture, high-end electronics product photography, modern and sleek",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "1:1",
    tags: ["headphones", "tech", "product", "audio", "premium"],
  },

  // ═══════════════════════════════════════════
  // PORTRAIT
  // ═══════════════════════════════════════════
  {
    title: "Golden Hour Portrait",
    category: "Portrait",
    hiddenPrompt: "A stunning portrait photograph of a person during golden hour, warm sunlight creating a beautiful rim light on hair, soft bokeh of meadow flowers in background, natural relaxed expression, shallow depth of field, warm color grading, professional portrait photography, Canon 85mm f/1.4 lens aesthetic, editorial quality",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "3:4",
    tags: ["portrait", "golden-hour", "natural", "photography", "outdoor"],
  },
  {
    title: "Dramatic Studio Portrait",
    category: "Portrait",
    hiddenPrompt: "A powerful dramatic studio portrait with Rembrandt lighting, one side of the face illuminated while the other falls into deep shadow, catchlight in the eyes, dark moody background, sharp focus on the eyes, professional studio photography, high contrast black and white option, emotional and intense expression",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "3:4",
    tags: ["portrait", "studio", "dramatic", "lighting", "professional"],
  },
  {
    title: "Neon Portrait",
    category: "Portrait",
    hiddenPrompt: "A striking portrait lit entirely by neon lights — pink from the left, blue from the right — creating a vivid split-tone effect on the face, urban night setting with rain and reflections, wet hair, confident gaze directly at camera, cyberpunk portrait aesthetic, high fashion meets street photography, ultra sharp",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "3:4",
    tags: ["portrait", "neon", "cyberpunk", "night", "colorful"],
  },
  {
    title: "Vintage Film Portrait",
    category: "Portrait",
    hiddenPrompt: "A nostalgic portrait with authentic vintage film photography aesthetic, slightly grainy texture, warm faded color palette with lifted blacks, soft focus, natural window light, casual candid pose, wearing earth-toned clothing, indoor setting with warm wood tones, Kodak Portra 400 film simulation, emotional and authentic mood",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "3:4",
    tags: ["portrait", "vintage", "film", "retro", "nostalgic"],
  },
  {
    title: "Creative Double Exposure",
    category: "Portrait",
    hiddenPrompt: "A creative double exposure portrait combining a person's silhouette profile with a stunning nature landscape — mountains, forests, and a starry night sky visible within the outline of the head and shoulders, seamless blending, artistic and surreal, fine art portrait photography, dark background, high contrast",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "3:4",
    tags: ["portrait", "double-exposure", "creative", "artistic", "surreal"],
  },

  // ═══════════════════════════════════════════
  // INSTAGRAM
  // ═══════════════════════════════════════════
  {
    title: "Aesthetic Coffee Moment",
    category: "Instagram",
    hiddenPrompt: "A perfectly styled Instagram-worthy coffee flat lay, ceramic latte art cup on a marble table, croissant on a small plate, a book and reading glasses, morning sunlight casting beautiful shadows through a window, warm cozy aesthetic, minimalist and clean, influencer lifestyle photography, top-down view",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "1:1",
    tags: ["coffee", "aesthetic", "lifestyle", "instagram", "cozy"],
  },
  {
    title: "Travel Wanderlust",
    category: "Instagram",
    hiddenPrompt: "A breathtaking travel photograph of a person standing at the edge of a dramatic cliff overlooking turquoise ocean waters, wearing a flowing white dress or linen shirt, wind in hair, golden hour lighting, small islands visible in the distance, Instagram travel influencer aesthetic, wide angle, vivid colors, wanderlust vibes",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "3:4",
    tags: ["travel", "wanderlust", "ocean", "instagram", "adventure"],
  },
  {
    title: "Neon Party Vibes",
    category: "Instagram",
    hiddenPrompt: "An electric party atmosphere photo with colorful neon lights, LED strips, and glow sticks, crowd silhouettes dancing, confetti in the air, DJ booth with dramatic laser beams, vibrant purple, pink and blue color palette, motion blur for energy, nightclub photography, festival aesthetic, Instagram story worthy",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "9:16",
    tags: ["party", "neon", "nightlife", "instagram", "festival"],
  },
  {
    title: "Minimalist Outfit Flat Lay",
    category: "Instagram",
    hiddenPrompt: "A perfectly arranged outfit flat lay on a clean white bedsheet, including a folded neutral-toned sweater, denim jeans, white sneakers, sunglasses, a crossbody bag, and a watch, top-down view, soft natural light, organized and aesthetic, fashion influencer style, Instagram grid worthy, VSCO filter aesthetic",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "1:1",
    tags: ["fashion", "flat-lay", "outfit", "instagram", "minimalist"],
  },
  {
    title: "Sunset Beach Silhouette",
    category: "Instagram",
    hiddenPrompt: "A dramatic beach sunset silhouette photograph, person with arms raised in celebration against a stunning gradient sky of orange, pink, purple and gold, calm ocean reflecting the colors, palm trees framing the scene, waves gently lapping the shore, golden hour magic, viral Instagram aesthetic, warm dreamy tones",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "9:16",
    tags: ["sunset", "beach", "silhouette", "instagram", "summer"],
  },

  // ═══════════════════════════════════════════
  // ART & ILLUSTRATION
  // ═══════════════════════════════════════════
  {
    title: "Japanese Ukiyo-e Wave",
    category: "Art & Illustration",
    hiddenPrompt: "A stunning modern interpretation of The Great Wave off Kanagawa in the style of traditional Japanese ukiyo-e woodblock print, towering ocean wave with intricate foam detail, Mount Fuji in the background, traditional color palette of indigo blue and white with touches of warm ochre, dramatic composition, fine line work, artistic masterpiece",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "16:9",
    tags: ["japanese", "wave", "ukiyo-e", "art", "traditional"],
  },
  {
    title: "Watercolor Botanical",
    category: "Art & Illustration",
    hiddenPrompt: "A delicate watercolor botanical illustration of wildflowers and herbs arranged in a natural bouquet, soft washes of lavender, sage green, dusty pink and golden yellow, visible watercolor paper texture, loose and fluid brushstrokes, some stems and leaves with fine detailed linework, white background, botanical art print quality",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "3:4",
    tags: ["watercolor", "botanical", "flowers", "art", "illustration"],
  },
  {
    title: "Retro Pop Art Explosion",
    category: "Art & Illustration",
    hiddenPrompt: "A bold pop art illustration in the style of Roy Lichtenstein and Andy Warhol, comic book halftone dots, bright primary colors of red yellow and blue, thick black outlines, speech bubble with 'WOW!' text, explosive starburst background, retro 1960s aesthetic, screen print quality, vibrant and eye-catching",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "1:1",
    tags: ["pop-art", "retro", "comic", "colorful", "illustration"],
  },
  {
    title: "Art Deco Geometric",
    category: "Art & Illustration",
    hiddenPrompt: "An elegant Art Deco geometric design inspired by 1920s architecture and design, symmetrical golden geometric patterns with sharp angles and sunburst motifs, rich color palette of deep navy, emerald green, and warm gold, Gatsby era aesthetic, luxurious and ornamental, suitable for poster or wall art, high detail metallic textures",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "3:4",
    tags: ["art-deco", "geometric", "vintage", "gold", "elegant"],
  },
  {
    title: "Digital Anime Character",
    category: "Art & Illustration",
    hiddenPrompt: "A beautifully illustrated anime character in a dynamic pose, detailed eyes with light reflections, flowing hair with gradient colors from blue to purple, wearing a futuristic outfit with glowing accents, cherry blossom petals floating around, soft pastel background with light rays, high quality anime illustration, manga art style, vibrant and expressive",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "3:4",
    tags: ["anime", "character", "manga", "digital-art", "illustration"],
  },

  // ═══════════════════════════════════════════
  // YOUTUBE THUMBNAILS
  // ═══════════════════════════════════════════
  {
    title: "Shocked Face Thumbnail",
    category: "YouTube Thumbnails",
    hiddenPrompt: "A YouTube thumbnail showing a person with an exaggerated shocked expression, mouth wide open, hands on cheeks, bright red and yellow background with explosive starburst effect, large bold white text area on the right side, dramatic lighting on face, high contrast, vibrant saturated colors, eye-catching and clickable, 16:9 aspect ratio",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "16:9",
    tags: ["youtube", "thumbnail", "shocked", "reaction", "viral"],
  },
  {
    title: "Gaming Thumbnail",
    category: "YouTube Thumbnails",
    hiddenPrompt: "An epic gaming YouTube thumbnail, split screen showing a gamer with headset on one side and game action scene on the other, neon green and purple color scheme, RGB lighting effects, dramatic facial expression of concentration, game controller visible, energy effects and sparks, bold 'VS' or arrow graphics, high contrast, dark background with glowing elements",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "16:9",
    tags: ["gaming", "youtube", "thumbnail", "esports", "streamer"],
  },
  {
    title: "Tech Review Thumbnail",
    category: "YouTube Thumbnails",
    hiddenPrompt: "A clean tech review YouTube thumbnail showing a sleek smartphone or laptop being held up with one hand, minimalist gradient background transitioning from blue to purple, subtle tech circuit patterns, product clearly visible and in focus, clean modern typography space, Apple/Samsung review aesthetic, professional lighting, high quality product shot",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "16:9",
    tags: ["tech", "review", "youtube", "thumbnail", "gadget"],
  },
  {
    title: "Cooking Recipe Thumbnail",
    category: "YouTube Thumbnails",
    hiddenPrompt: "A mouth-watering cooking YouTube thumbnail, perfectly plated gourmet dish as the hero, steam rising from hot food, warm inviting kitchen background slightly blurred, ingredients artfully scattered around the plate, rich warm color grading, top-down angle, professional food photography lighting, space for text overlay on top portion",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "16:9",
    tags: ["cooking", "food", "recipe", "youtube", "thumbnail"],
  },
  {
    title: "Before & After Thumbnail",
    category: "YouTube Thumbnails",
    hiddenPrompt: "A dramatic before and after transformation YouTube thumbnail, split down the middle with a glowing dividing line, left side darker and less appealing, right side bright vibrant and impressive, large arrow pointing from before to after, contrasting color grading between halves, dramatic and compelling, fitness or room makeover style, high contrast",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "16:9",
    tags: ["before-after", "transformation", "youtube", "thumbnail", "viral"],
  },

  // ═══════════════════════════════════════════
  // FOOD & RESTAURANT
  // ═══════════════════════════════════════════
  {
    title: "Gourmet Burger",
    category: "Food & Restaurant",
    hiddenPrompt: "A towering gourmet burger with melting cheese, crispy bacon, fresh lettuce, tomato and caramelized onions on a brioche bun, juices dripping, served on a rustic wooden board, dramatic dark moody background, side lighting creating beautiful highlights on the cheese, professional food photography, shallow depth of field, mouth-watering detail",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "1:1",
    tags: ["burger", "food", "gourmet", "restaurant", "photography"],
  },
  {
    title: "Sushi Platter",
    category: "Food & Restaurant",
    hiddenPrompt: "An exquisite sushi platter arranged on a black slate board, assorted nigiri and maki rolls with glistening fresh fish — salmon, tuna, yellowtail — garnished with thin ginger slices, wasabi, and edible flowers, chopsticks resting beside, dramatic top-down angle, moody dark background, restaurant menu quality, Japanese culinary art",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "16:9",
    tags: ["sushi", "japanese", "food", "restaurant", "seafood"],
  },
  {
    title: "Italian Pasta Dish",
    category: "Food & Restaurant",
    hiddenPrompt: "A beautiful plate of fresh handmade pasta with rich tomato basil sauce, parmesan shavings, and a drizzle of olive oil, served in a rustic ceramic bowl on a Italian restaurant table with checkered napkin, fresh basil leaves scattered, warm Mediterranean lighting, authentic Italian trattoria atmosphere, food editorial photography",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "1:1",
    tags: ["pasta", "italian", "food", "restaurant", "mediterranean"],
  },
  {
    title: "Artisan Coffee Latte Art",
    category: "Food & Restaurant",
    hiddenPrompt: "A perfect latte art rosetta pattern in a ceramic coffee cup, shot from directly above, creamy milk foam creating an intricate leaf design, warm tones, coffee shop setting with wooden counter visible, a few coffee beans scattered nearby, morning light, cafe aesthetic, barista quality, warm and inviting mood",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "1:1",
    tags: ["coffee", "latte-art", "cafe", "barista", "food"],
  },
  {
    title: "Dessert Showcase",
    category: "Food & Restaurant",
    hiddenPrompt: "An elaborate dessert plating — chocolate lava cake with molten center flowing out, accompanied by a scoop of vanilla ice cream, raspberry coulis drizzle, fresh berries, edible gold leaf, and a mint sprig, fine dining presentation on a white plate, dark elegant background, dramatic spot lighting, pastry chef quality, decadent and luxurious",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "1:1",
    tags: ["dessert", "chocolate", "cake", "fine-dining", "pastry"],
  },

  // ═══════════════════════════════════════════
  // REAL ESTATE
  // ═══════════════════════════════════════════
  {
    title: "Modern Luxury Living Room",
    category: "Real Estate",
    hiddenPrompt: "A stunning modern luxury living room interior with floor-to-ceiling windows overlooking a city skyline, neutral palette of cream, gray and warm wood tones, designer furniture including a large sectional sofa, coffee table with art books, statement pendant lighting, indoor plants, afternoon sunlight streaming in, architectural photography, real estate listing quality, warm and inviting",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "16:9",
    tags: ["real-estate", "interior", "luxury", "living-room", "modern"],
  },
  {
    title: "Dream Kitchen",
    category: "Real Estate",
    hiddenPrompt: "A gorgeous modern kitchen with a large marble waterfall island, high-end stainless steel appliances, custom white cabinetry with brass hardware, pendant lights over the island, subway tile backsplash, fresh flowers in a vase, fruit bowl, styled but lived-in feel, bright and airy with natural light, real estate photography, warm color grading",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "16:9",
    tags: ["kitchen", "real-estate", "interior", "luxury", "modern"],
  },
  {
    title: "Beachfront Property",
    category: "Real Estate",
    hiddenPrompt: "A stunning beachfront luxury property exterior shot at sunset, modern architecture with large glass walls, infinity pool merging with the ocean horizon, palm trees swaying, warm golden light, manicured tropical landscaping, outdoor lounge area with fire pit, drone perspective slightly elevated, real estate listing hero image, aspirational and luxurious",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "16:9",
    tags: ["beachfront", "luxury", "real-estate", "property", "exterior"],
  },
  {
    title: "Cozy Bedroom Suite",
    category: "Real Estate",
    hiddenPrompt: "A serene master bedroom with a king-size bed dressed in crisp white linens and plush pillows, upholstered headboard, nightstands with modern lamps, sheer curtains letting in soft morning light, neutral and calming color palette, plush area rug, a reading nook by the window, tasteful wall art, hotel-quality staging, real estate photography",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "16:9",
    tags: ["bedroom", "real-estate", "interior", "cozy", "luxury"],
  },
  {
    title: "Backyard Oasis",
    category: "Real Estate",
    hiddenPrompt: "A beautifully landscaped backyard with a sparkling pool, stone patio with outdoor dining set and string lights, built-in BBQ area, lush green lawn, mature trees providing shade, colorful garden beds, lounge chairs by the pool, twilight shot with warm ambient lighting, suburban dream home backyard, real estate exterior photography",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "16:9",
    tags: ["backyard", "pool", "real-estate", "outdoor", "landscaping"],
  },

  // ═══════════════════════════════════════════
  // FITNESS
  // ═══════════════════════════════════════════
  {
    title: "Gym Motivation",
    category: "Fitness",
    hiddenPrompt: "A powerful fitness motivation image of an athlete doing heavy deadlifts in a dark industrial gym, dramatic moody lighting with a single spotlight, chalk dust visible in the air, muscular physique showing effort and determination, weight plates visible, gritty texture, dark background, high contrast, sports photography, motivational poster quality",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "3:4",
    tags: ["fitness", "gym", "motivation", "workout", "strength"],
  },
  {
    title: "Yoga Sunrise",
    category: "Fitness",
    hiddenPrompt: "A serene yoga pose silhouette against a breathtaking sunrise, person in warrior pose on a cliff or beach, warm golden light creating a perfect silhouette, calm ocean or mountain landscape in background, peaceful and spiritual atmosphere, warm orange and purple sky gradients, wellness and mindfulness aesthetic, inspirational fitness photography",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "16:9",
    tags: ["yoga", "sunrise", "fitness", "wellness", "mindfulness"],
  },
  {
    title: "Running in Nature",
    category: "Fitness",
    hiddenPrompt: "An action shot of a trail runner on a beautiful mountain path, early morning golden light, dynamic running pose showing speed and energy, athletic wear, scenic mountain landscape in background, dust kicking up from the trail, sharp focus on the runner with blurred background suggesting motion, outdoor fitness photography, adventure aesthetic",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "16:9",
    tags: ["running", "trail", "fitness", "outdoor", "adventure"],
  },
  {
    title: "Healthy Meal Prep",
    category: "Fitness",
    hiddenPrompt: "A colorful healthy meal prep spread shot from above, glass containers filled with grilled chicken, quinoa, roasted vegetables, avocado slices, and fresh salad, organized in a grid layout on a clean marble counter, vibrant colors of greens reds and yellows, fitness lifestyle aesthetic, nutrition-focused, clean eating visual, bright natural lighting",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "1:1",
    tags: ["meal-prep", "healthy", "fitness", "nutrition", "food"],
  },
  {
    title: "CrossFit Action",
    category: "Fitness",
    hiddenPrompt: "An intense CrossFit box jump action shot captured mid-air, athlete in peak athletic form, explosive power and energy, plyometric box visible, dark gym background with dramatic overhead lighting, sweat droplets visible, other gym equipment blurred in background, high-speed photography feel, gritty and powerful, sports photography",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "3:4",
    tags: ["crossfit", "action", "fitness", "athletic", "training"],
  },

  // ═══════════════════════════════════════════
  // LOGO
  // ═══════════════════════════════════════════
  {
    title: "Tech Startup Logo",
    category: "Logo",
    hiddenPrompt: "A modern minimalist tech startup logo design, clean geometric lettermark using sharp angles and clean lines, gradient from electric blue to purple, flat design style, suitable for app icon and website, white background, professional corporate identity, silicon valley aesthetic, scalable vector quality, simple and memorable",
    model: "imagen-3",
    creditCost: 2,
    aspectRatio: "1:1",
    tags: ["logo", "tech", "startup", "minimalist", "modern"],
  },
  {
    title: "Restaurant Badge Logo",
    category: "Logo",
    hiddenPrompt: "A vintage restaurant badge logo design, circular emblem with ornate border details, elegant serif typography in the center, wheat or laurel wreath elements, established date ribbon at bottom, warm color palette of deep brown cream and gold, artisan craft brewery or steakhouse aesthetic, retro vintage quality, detailed engraving style",
    model: "imagen-3",
    creditCost: 2,
    aspectRatio: "1:1",
    tags: ["logo", "restaurant", "vintage", "badge", "emblem"],
  },
  {
    title: "Fitness Brand Logo",
    category: "Logo",
    hiddenPrompt: "A bold dynamic fitness brand logo, strong angular lettermark or abstract figure in motion, aggressive sharp edges suggesting power and movement, black and red color scheme, suitable for gym apparel and equipment branding, Nike/Under Armour inspired energy, clean white background, professional sports brand identity, instantly recognizable",
    model: "imagen-3",
    creditCost: 2,
    aspectRatio: "1:1",
    tags: ["logo", "fitness", "brand", "sports", "bold"],
  },
  {
    title: "Eco-Friendly Brand Logo",
    category: "Logo",
    hiddenPrompt: "An organic eco-friendly brand logo design, leaf or tree element integrated into clean modern typography, natural green color palette with earth tones, sustainable and environmental feel, handcrafted quality with modern execution, suitable for organic food or sustainable fashion brand, white background, minimalist and elegant, nature-inspired",
    model: "imagen-3",
    creditCost: 2,
    aspectRatio: "1:1",
    tags: ["logo", "eco", "organic", "green", "sustainable"],
  },
  {
    title: "Photography Studio Logo",
    category: "Logo",
    hiddenPrompt: "An elegant photography studio logo, camera aperture or lens element subtly incorporated, sophisticated script or modern sans-serif typography, monochrome black and white design with optional gold accent, luxury branding feel suitable for wedding and portrait photographer, clean white background, timeless and professional, high-end studio identity",
    model: "imagen-3",
    creditCost: 2,
    aspectRatio: "1:1",
    tags: ["logo", "photography", "studio", "elegant", "professional"],
  },

  // ═══════════════════════════════════════════
  // BUSINESS
  // ═══════════════════════════════════════════
  {
    title: "Corporate Presentation Slide",
    category: "Business",
    hiddenPrompt: "A professional corporate presentation slide background, clean modern design with subtle geometric shapes and gradients, dark navy blue base color with accent lines in teal and white, space for headline text and bullet points, professional business aesthetic, suitable for keynote or investor pitch deck, minimal and polished, corporate identity quality",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "16:9",
    tags: ["business", "presentation", "corporate", "slide", "professional"],
  },
  {
    title: "Business Card Design",
    category: "Business",
    hiddenPrompt: "A premium business card design mockup, modern minimalist layout with clean typography, luxury texture — either soft touch matte or letterpress effect, subtle foil stamping in gold, dark charcoal background with white text, professional contact information layout, shown at an elegant angle with shadow, premium stationery mockup quality, high-end branding",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "16:9",
    tags: ["business-card", "branding", "corporate", "design", "professional"],
  },
  {
    title: "Team Meeting Photo",
    category: "Business",
    hiddenPrompt: "A diverse professional team in a modern bright office having a collaborative meeting around a large table, laptops and notebooks visible, whiteboard with diagrams in background, natural light from large windows, engaged body language and smiles, corporate stock photo quality, startup culture feel, inclusive and dynamic team atmosphere",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "16:9",
    tags: ["business", "team", "meeting", "office", "corporate"],
  },
  {
    title: "Social Media Marketing Banner",
    category: "Business",
    hiddenPrompt: "A professional social media marketing banner design, modern gradient background transitioning from deep blue to vibrant purple, abstract data visualization elements like charts and growth arrows, floating device mockups showing social media platforms, clean sans-serif typography space, digital marketing agency aesthetic, eye-catching and professional",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "16:9",
    tags: ["marketing", "social-media", "banner", "business", "digital"],
  },
  {
    title: "Startup Launch Graphic",
    category: "Business",
    hiddenPrompt: "A dynamic startup launch announcement graphic, rocket launching upward with trailing light and energy particles, modern gradient background from dark to bright, celebratory confetti elements, abstract geometric shapes, tech startup aesthetic, suitable for social media announcement or landing page hero, energetic and optimistic, professional quality",
    model: "imagen-3",
    creditCost: 1,
    aspectRatio: "1:1",
    tags: ["startup", "launch", "rocket", "business", "announcement"],
  },
];
