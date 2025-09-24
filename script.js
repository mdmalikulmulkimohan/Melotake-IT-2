// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1000);
});

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or prefer color scheme
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Cursor Effects
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

document.addEventListener('mousedown', function() {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.2)';
});

document.addEventListener('mouseup', function() {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
});

// Interactive elements cursor effect
const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, select');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    element.addEventListener('mouseleave', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Particle Background for Hero Section
function initParticleBackground() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function setCanvasSize() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    const particles = [];
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Connect particles
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance/100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Animated Counter
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start counter when in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Job Positions Data
const jobPositions = [
    {
        id: 1,
        title: "ফ্রন্টএন্ড ডেভেলপার",
        category: "development",
        type: "ফুল-টাইম",
        location: "ঢাকা / দূরবর্তী",
        experience: "২-৪ বছর",
        deadline: "৩০ সেপ্টেম্বর, ২০২৩",
        description: "আমাদের দলের সাথে কাজ করে আধুনিক ওয়েব অ্যাপ্লিকেশন তৈরি করুন। React, Vue.js বা Angular এ অভিজ্ঞতা প্রয়োজন।",
        tags: ["React", "JavaScript", "CSS", "UI/UX"]
    },
    {
        id: 2,
        title: "ব্যাকএন্ড ডেভেলপার",
        category: "development",
        type: "ফুল-টাইম",
        location: "ঢাকা",
        experience: "৩-৫ বছর",
        deadline: "১৫ অক্টোবর, ২০২৩",
        description: "স্কেলেবল ব্যাকএন্ড সিস্টেম ডিজাইন ও ডেভেলপমেন্টে অংশ নিন। Node.js, Python বা PHP এ দক্ষতা প্রয়োজন।",
        tags: ["Node.js", "Python", "Database", "API"]
    },
    {
        id: 3,
        title: "UI/UX ডিজাইনার",
        category: "design",
        type: "ফুল-টাইম",
        location: "ঢাকা / দূরবর্তী",
        experience: "২-৪ বছর",
        deadline: "২৫ সেপ্টেম্বর, ২০২৩",
        description: "ব্যবহারকারী-কেন্দ্রিক ডিজাইন তৈরি করুন এবং আমাদের পণ্যের ব্যবহারকারী অভিজ্ঞতা উন্নত করুন।",
        tags: ["Figma", "Adobe XD", "User Research", "Prototyping"]
    },
    {
        id: 4,
        title: "ডিজিটাল মার্কেটিং এক্সপার্ট",
        category: "marketing",
        type: "ফুল-টাইম",
        location: "ঢাকা",
        experience: "৩-৫ বছর",
        deadline: "১০ অক্টোবর, ২০২৩",
        description: "ডিজিটাল মার্কেটিং ক্যাম্পেইন পরিকল্পনা ও বাস্তবায়ন করুন এবং ব্র্যান্ড উপস্থিতি বৃদ্ধি করুন।",
        tags: ["SEO", "Social Media", "Content", "Analytics"]
    },
    {
        id: 5,
        title: "প্রোজেক্ট ম্যানেজার",
        category: "business",
        type: "ফুল-টাইম",
        location: "ঢাকা",
        experience: "৫+ বছর",
        deadline: "৫ নভেম্বর, ২০২৩",
        description: "টেকনিক্যাল প্রোজেক্ট ম্যানেজমেন্ট এবং টিম লিডারশিপের দায়িত্ব পালন করুন।",
        tags: ["Agile", "Scrum", "Leadership", "Planning"]
    },
    {
        id: 6,
        title: "ডেটা সায়েন্টিস্ট",
        category: "development",
        type: "ফুল-টাইম",
        location: "দূরবর্তী",
        experience: "৩-৫ বছর",
        deadline: "২০ অক্টোবর, ২০২৩",
        description: "ডেটা বিশ্লেষণ এবং মেশিন লার্নিং মডেল তৈরি করে ব্যবসায়িক সিদ্ধান্তে সহায়তা করুন।",
        tags: ["Python", "Machine Learning", "SQL", "Statistics"]
    }
];

// Render Job Positions
function renderJobPositions(filter = 'all') {
    const positionsGrid = document.querySelector('.positions-grid');
    const filteredPositions = filter === 'all' 
        ? jobPositions 
        : jobPositions.filter(position => position.category === filter);
    
    positionsGrid.innerHTML = '';
    
    if (filteredPositions.length === 0) {
        positionsGrid.innerHTML = `
            <div class="no-positions" style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <h3>কোন পদ খুঁজে পাওয়া যায়নি</h3>
                <p>선택된 বিভাগে 현재 কোন খোলা পদ নেই। অন্য বিভাগ চেক করুন বা পরে আবার দেখুন।</p>
            </div>
        `;
        return;
    }
    
    filteredPositions.forEach(position => {
        const positionCard = document.createElement('div');
        positionCard.className = 'position-card';
        positionCard.setAttribute('data-aos', 'fade-up');
        
        positionCard.innerHTML = `
            <div class="position-header">
                <h3 class="position-title">${position.title}</h3>
                <div class="position-meta">
                    <span><i class="fas fa-clock"></i> ${position.type}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${position.location}</span>
                </div>
            </div>
            <div class="position-body">
                <p class="position-description">${position.description}</p>
                <div class="position-tags">
                    ${position.tags.map(tag => `<span class="position-tag">${tag}</span>`).join('')}
                </div>
                <div class="position-meta">
                    <span><i class="fas fa-briefcase"></i> অভিজ্ঞতা: ${position.experience}</span>
                    <span><i class="fas fa-calendar-alt"></i> শেষ তারিখ: ${position.deadline}</span>
                </div>
            </div>
            <div class="position-footer">
                <div class="position-actions">
                    <button class="btn btn-primary apply-btn" data-position="${position.title}">
                        <span>আবেদন করুন</span>
                        <i class="fas fa-arrow-right"></i>
                    </button>
                    <button class="btn btn-secondary details-btn">
                        <span>বিস্তারিত</span>
                    </button>
                </div>
            </div>
        `;
        
        positionsGrid.appendChild(positionCard);
    });
    
    // Add event listeners to apply buttons
    document.querySelectorAll('.apply-btn').forEach(button => {
        button.addEventListener('click', function() {
            const positionTitle = this.getAttribute('data-position');
            document.getElementById('position').value = positionTitle;
            document.getElementById('apply').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Position Filtering
function initPositionFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter positions
            const filterValue = this.getAttribute('data-filter');
            renderJobPositions(filterValue);
        });
    });
}

// Populate Position Select in Application Form
function populatePositionSelect() {
    const positionSelect = document.getElementById('position');
    
    jobPositions.forEach(position => {
        const option = document.createElement('option');
        option.value = position.title;
        option.textContent = position.title;
        positionSelect.appendChild(option);
    });
}

// Form Handling
function initForms() {
    // Job Application Form
    const jobApplicationForm = document.getElementById('jobApplicationForm');
    
    jobApplicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const applicationData = {
            name: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            position: formData.get('position'),
            message: formData.get('message')
        };
        
        // In a real application, you would send this data to a server
        // For this demo, we'll simulate a successful submission
        
        // Show success modal
        showModal(`ধন্যবাদ ${applicationData.name}! আপনার ${applicationData.position} পদে আবেদনটি সফলভাবে জমা হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।`);
        
        // Reset form
        this.reset();
    });
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const contactData = {
            name: formData.get('contactName'),
            email: formData.get('contactEmail'),
            subject: formData.get('contactSubject'),
            message: formData.get('contactMessage')
        };
        
        // Show success modal
        showModal('আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে। আমরা ২৪ ঘন্টার মধ্যে আপনার সাথে যোগাযোগ করব।');
        
        // Reset form
        this.reset();
    });
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        
        // Show success modal
        showModal('নিউজলেটারে সাবস্ক্রাইব করার জন্য ধন্যবাদ! আমরা আপনাকে নতুন পদ এবং ক্যারিয়ার সুযোগ সম্পর্কে আপডেট করব।');
        
        // Reset form
        emailInput.value = '';
    });
}

// Modal Functions
function showModal(message) {
    const modal = document.getElementById('successModal');
    const modalMessage = document.getElementById('modalMessage');
    
    modalMessage.textContent = message;
    modal.classList.add('active');
    
    // Close modal when clicking the button
    document.getElementById('modalClose').addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// File Upload Styling
function initFileUpload() {
    const fileInput = document.getElementById('resume');
    const fileLabel = document.querySelector('.file-label span');
    
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            fileLabel.textContent = this.files[0].name;
        } else {
            fileLabel.textContent = 'ফাইল নির্বাচন করুন';
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initParticleBackground();
    initCounters();
    renderJobPositions();
    initPositionFilter();
    populatePositionSelect();
    initForms();
    initFileUpload();
    initSmoothScrolling();
});
