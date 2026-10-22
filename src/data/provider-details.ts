/**
 * Detail page content for each provider. Copied from the old site (neufoot.com/provider).
 * Key = provider slug (see `providers` in site.ts). `offices` are clinic slugs.
 */
export type ProviderDetail = {
  offices: string[];
  seeing: string;
  bio: string[];
  sections?: { title: string; items: string[] }[];
};

export const providerDetails: Record<string, ProviderDetail> = {
  "matthew-neuhaus": {
    offices: ["smyrna", "mount-juliet"],
    seeing: "Dr. Neuhaus is currently seeing patients in our Smyrna and Mount Juliet offices.",
    bio: [
      "Dr. Matthew Neuhaus, originally from Madison, Wisconsin, has been in private practice in Nashville since 2003. He is married to his high school sweetheart, Allyson, and together they have 11 children.",
      "Dr. Neuhaus is a graduate of Brigham Young University. During college, he took 2 years off so he could serve as a missionary in Spain for the Church of Jesus Christ of Latter-Day Saints, and he received his doctorate from the California College of Podiatric Medicine in 2000. He spent his fourth year of podiatric medical school at the University of Texas Health Science Center, San Antonio. While in Texas, he received extensive training in diabetic foot care. He did his residency training in reconstructive foot and ankle surgery in Louisville, Kentucky, in association with the University of Louisville. Dr. Neuhaus is fluent in English and Spanish.",
    ],
    sections: [
      { title: "Certifications and memberships", items: [
        "Board Certified, American Board of Foot and Ankle Surgery, Foot Surgery",
        "Board Certified, American Board of Foot and Ankle Surgery, Reconstructive Rearfoot and Ankle Surgery",
        "Member of the Tennessee Podiatric Medical Association",
        "Member of the American Podiatric Medical Association",
        "Member of the American Academy of Podiatric Practice Management",
        "Fellow of the American College of Foot and Ankle Surgeons",
      ] },
      { title: "Residency training", items: [
        "Reconstructive Foot and Ankle Surgery, Kentucky Podiatric Surgical Residency Program / University of Louisville Health Care, July 2000 to June 2003",
        "University of Louisville Department of Orthopedics Trauma Service, 8 months",
        "University of Louisville rotations: Vascular Surgery, Plastic Surgery, Orthopedic Surgery, Anesthesia, Infectious Disease, Emergency Medicine, Family Medicine, and Rheumatology",
      ] },
      { title: "Education", items: [
        "California College of Podiatric Medicine, Podiatric Medicine and Surgery, San Francisco, California, 1996 to 2000, Honors list. Fourth year spent at the University of Texas, San Antonio, with an emphasis on the diabetic foot.",
        "Brigham Young University, Provo, Utah, Bachelor of Science in Zoology (Pre Med), 1996",
      ] },
      { title: "Professional interests", items: [
        "Bunions", "Heel pain", "Ingrown toenails", "Reconstructive foot and ankle surgery",
        "Athletic injuries: sprains, strains, and fractures", "Diabetic foot care: ulcers and orthotics",
      ] },
      { title: "Personal interests", items: ["Spending time with his family", "Traveling around the world"] },
    ],
  },

  "peninnah-kumar": {
    offices: ["mount-juliet", "hermitage"],
    seeing: "Dr. Kumar is currently seeing patients in our Mount Juliet and Hermitage offices.",
    bio: [
      "Dr. Kumar was born in South India but grew up in Philadelphia, PA, and moved to the Nashville area to be closer to her parents. At a very young age, diabetes had a significant impact on her family's life and opened the doors to podiatry. Her undergraduate studies were split between Villanova University and Alderson Broaddus College in West Virginia. Her desire to pursue her love for surgery and medicine led her to Cleveland, OH, where she completed 4 years at the Ohio College of Podiatric Medicine. In June 2013, Dr. Kumar graduated from the 3 year Atlanta Veterans Affairs Residency program with a PMSR Reconstructive Rearfoot and Ankle certificate. During her residency, Dr. Kumar was given the opportunity to lecture at national and regional podiatry conferences as well as publish podiatric literature.",
      "Dr. Kumar credits her husband Jonathan, her family, and most importantly, God's guidance for helping her achieve her goals. Her greatest achievements to date have to be the birth of her four sons, James, Judah, Jaren, and Jace.",
    ],
    sections: [
      { title: "Certifications and memberships", items: [
        "Board Certified: American Board of Podiatric Medicine",
        "Board Certified: American Board of Foot and Ankle Surgery (Certified in Foot Surgery)",
        "Certified Wound Specialist Physician (CWSP): American Board of Wound Management",
        "Fellow: American College of Foot and Ankle Surgeons (FACFAS)",
        "Fellow: American College of Podiatric Medicine (FACPM)",
      ] },
      { title: "Education and training", items: [
        "Residency: Reconstructive Foot and Ankle Surgery, Atlanta Veterans Affairs Residency Program, Atlanta, Georgia",
        "DPM: Ohio College of Podiatric Medicine, Cleveland, Ohio",
        "Undergraduate: Villanova University, Villanova, Pennsylvania, and Alderson Broaddus College, West Virginia",
        "Study abroad: Madrid, Spain, Summer 2004",
        "Undergraduate degree: B.S. Biology/Pre-Med, Alderson-Broaddus College, Magna cum Laude",
      ] },
      { title: "Publications", items: [
        "Various Techniques in Tarsal Coalition Resection, Podiatry Institute Update 2013",
        "5 reviews on articles written for the 2008 Compendium, 2007",
        "WV-INBRE Research Internship: Effects of Nitric Oxide on Cancer Cells",
      ] },
      { title: "Professional interests", items: ["Diabetic foot care", "Foot and ankle surgery", "Heel pain", "Ingrown nails", "Skin lesions", "Athletic injuries"] },
    ],
  },

  "christopher-benac": {
    offices: ["lebanon"],
    seeing: "Dr. Benac is currently seeing patients in our Lebanon office.",
    bio: [
      "Dr. Christopher Benac is originally from Portage, Indiana. He is married to his wife, Julie, and has a beautiful daughter named Leah. Prior to getting into podiatry, Dr. Benac was a military police officer in the United States Marine Corps for 10 years and was a police officer for the Metropolitan Nashville Police Department for 5 years. He was a volunteer at the Vanderbilt emergency department in 2003. It was there that he developed a passion for medicine, which led him to become a podiatrist.",
      "In podiatry school, he was heavily involved in community service and was the community service chairman for 2 years. He organized fundraisers for local charities, such as the Juvenile Diabetes Association. He also organized volunteer events at homeless shelters to provide free medical screening and foot care.",
      "Dr. Benac met his wife Julie in Atlanta during residency, and they are excited to start a family in the Nashville area. They are big fans of music, concerts, and karaoke.",
    ],
    sections: [
      { title: "Memberships", items: ["Member of the American Podiatric Medical Association", "Member of the American Academy of Podiatric Practice Management"] },
      { title: "Residency training", items: ["Reconstructive Foot and Ankle Surgery, Atlanta Veterans Affairs Residency Program, Atlanta, Georgia"] },
      { title: "Education", items: [
        "DPM: Barry University College of Podiatric Medicine, Miami, Florida",
        "Master of Science: Jacksonville State University, Jacksonville, Alabama",
        "Bachelor of Science: Jacksonville State University, Jacksonville, Alabama",
      ] },
      { title: "Professional interests", items: ["Diabetic education and diabetic wound care", "Plantar fasciitis and heel pain", "Ingrown toenails", "Fall prevention", "Skin lesions and soft tissue masses"] },
      { title: "Personal interests", items: ["Going to church", "Playing the drums", "Going to concerts", "Traveling", "Exercising", "Enjoying a good cup of coffee"] },
      { title: "Medical staff privileges", items: ["Northridge Surgery Center", "Tennova Healthcare, Lebanon (formerly University Medical Center)", "Tristar Stonecrest Medical Center", "Tristar Summit Medical Center"] },
    ],
  },

  "john-boyd": {
    offices: ["goodlettsville"],
    seeing: "Dr. Boyd is currently seeing patients in our Goodlettsville office.",
    bio: [
      "Dr. John Boyd is certified by the American Board of Foot and Ankle Surgery in both foot and rearfoot reconstructive and ankle surgery. He has had training through Case Western Reserve University at St Vincent Charity Medical Center in Cleveland, OH.",
      "Dr. Boyd was drawn to the medical field after a football injury sidelined him for his senior year in Orchard Park, NY. During his rehab, a podiatrist pointed out a foot issue causing lack of hip mobility.",
      "He began his medical career as a Nurse Assistant working with Alzheimer's patients in an assisted living facility. During this time, he completed his bachelor's degree in Biological Sciences at the University at Buffalo. His desire to provide care at the highest level possible led to his Medical Degree from Kent State University College of Podiatric Medicine in 2016.",
      "At St Vincent Charity Medical Center, he focused on reconstructive foot and ankle surgery in the treatment of bunion, flat foot reconstruction, end stage arthritis of the ankle, subtalar, and all other joints of the foot. He had significant exposure to diabetic limb salvage, treatment of osteomyelitis, healing of complex and difficult wounds as well as sports medicine. During this time, he served on the hospital's ethics committee and was awarded the Spirit of Volunteerism award for his work in the local community.",
      "Dr. Boyd is published in multiple peer-reviewed journals and has spoken on a variety of complex pathology across the country as well as lectured to students at his alma mater, KSUCPM.",
      "Outside of work Dr. Boyd enjoys spending time with his wife and two boys, cooking, reading, weight lifting, bourbon collecting, and traveling.",
    ],
  },

  "emily-keeter": {
    offices: ["smyrna", "gallatin"],
    seeing: "Dr. Keeter is currently seeing patients in our Smyrna and Gallatin offices.",
    bio: [
      "Dr. Emily Keeter is a fellowship-trained foot and ankle surgeon originally from Central Florida. She grew up in a very athletic military family, and following several sports injuries, including a broken leg and stress fractures, her passion for foot and ankle injuries was formed. After a brief stint at the Air Force Academy, she finished her undergraduate degree in Nutritional Science at the University of Florida. Go Gators! From there she attended podiatry school at Temple University in Philadelphia, Pennsylvania. As a medical student, Dr. Keeter was president of the sports medicine club and organized events alongside the Philadelphia 76ers as well as working the medical tent at the Boston Marathon.",
      "Dr. Keeter moved to St. Louis, Missouri to complete her surgical residency, where she was trained in all facets of podiatric medicine and lower extremity surgery including trauma, Charcot reconstruction, forefoot, ankle reconstruction, and more.",
      "Following residency, Dr. Keeter completed a one-year foot and ankle reconstructive surgical fellowship at the American Foundation of Lower Extremity Surgery and Research. As one of the highest-ranked programs in the country and one of the oldest fellowships, it gave Dr. Keeter advanced training in complex deformity correction, arthroscopy, total ankle replacement, external fixation, sports medicine, and trauma.",
      "She has recently moved to Nashville, and when she is not working you will likely see her on a run, DIY-ing, or at a coffee shop. Dr. Keeter loves everything Nashville has to offer and is excited to give her patients the best care possible.",
    ],
    sections: [{ title: "Interests", items: ["Running", "Travel", "Crafting", "Music", "Outdoors"] }],
  },

  "lucy-barrow": {
    offices: ["gallatin"],
    seeing: "Dr. Barrow is currently seeing patients in our Gallatin office.",
    bio: [
      "Dr. Barrow grew up in Wigan, England, and moved to San Antonio, Texas at age 9. After completing her undergraduate degree at The University of Texas at Austin, Dr. Barrow moved to Philadelphia to complete her podiatric medical degree and residency. During her residency, she trained in all facets of podiatric medicine, including trauma and reconstructive foot and ankle surgery.",
      "Dr. Barrow and her family live in Nashville with their two miniature dachshunds, Walter and Beatrice. When Dr. Barrow is not in the office she is fulfilling her self-proclaimed title of \"foodie\", exploring new restaurants or baking and cooking at home.",
    ],
    sections: [
      { title: "Education and training", items: [
        "Residency: Bryn Mawr Hospital (Main Line Health), Bryn Mawr, PA, Reconstructive Foot and Ankle Surgery",
        "DPM: Temple University College of Podiatric Medicine, Philadelphia, PA",
        "Undergraduate: The University of Texas at Austin, Austin, TX",
      ] },
      { title: "Memberships and certifications", items: [
        "Board Qualified, American Board of Foot and Ankle Surgery, Foot Surgery and Reconstructive Rearfoot/Ankle Surgery",
        "Member of Tennessee Podiatric Medical Association",
        "Member of American Podiatric Medical Association",
        "Member of American College of Foot and Ankle Surgeons",
      ] },
      { title: "Professional interests", items: ["Foot and ankle surgery", "Wound care", "Diabetic foot care", "Bunions, conservative and surgical treatment", "Heel pain", "Ingrown toenails"] },
      { title: "Personal interests", items: ["Baking", "Cooking", "Personal fitness"] },
      { title: "Medical staff privileges", items: ["St. Thomas Midtown Hospital", "Sumner Regional Medical Center"] },
    ],
  },

  "brian-jackson": {
    offices: ["columbia", "pulaski"],
    seeing: "Dr. Jackson is seeing patients in our Columbia and Pulaski locations.",
    bio: [
      "Dr. Jackson received his undergraduate education in biology at the University of Memphis in Tennessee and attended medical school at Kent State University College of Podiatric Medicine in Independence, Ohio. After graduating in 1992, he completed a two-year residency at Kent State University College of Podiatric Medicine.",
      "Dr. Jackson is board certified in podiatric orthopedics and primary podiatric medicine. He specializes in general podiatric medicine, heel pain, diabetic foot care, ingrown toenails, and toenail fungus. He has been in practice for 27 years.",
    ],
  },

  "sheela-chockalingam": {
    offices: ["nashville"],
    seeing: "Dr. Chockalingam is currently seeing patients in our Nashville (Midtown) office.",
    bio: [
      "My path to podiatry is a bit of a different one. I did not know as a child that I wanted to be a doctor, I did not come from a family of physicians, and I had no knowledge of podiatry until later on in life. That all being said, I can tell you with 100% certainty that podiatric medicine is both my passion and calling in life.",
      "I have always been drawn to both the social sciences and natural sciences. While doing my undergraduate studies at Louisiana State University (Geaux Tigers!), I majored in biology and took a multitude of psychology classes. As I began to consider life after college, I wanted to pursue a career that would combine both interests. A job in the medical field was exactly what I was looking for. I would have a foundation in the sciences, but at the same time, I would be able to interact with people on an individual basis. My years of running and soccer also influenced me to become a podiatrist. Many of my teammates encountered foot and ankle injuries, and I learned firsthand how devastating these injuries could be. However, I also discovered the pivotal role a podiatric physician played in getting athletes back on the field.",
      "Private practice allows me to apply my medical knowledge and skills without feeling like I have to provide \"cookie cutter\" treatments. Every patient is unique, and my goal is to provide personalized care based on an individual's concerns and expectations. The foundation of my care also focuses on the relationship between foot health and a patient's overall wellbeing. Studies have shown that foot pain as well as general foot health are correlated to an individual's quality of life. I strive every day to keep patients' feet healthy and pain-free so that they can continue to live their lives to the fullest.",
      "Medicine has not only been a calling for me, but also a privilege. I look forward to taking care of you and your feet.",
    ],
  },

  "douglas-holder": {
    offices: ["clarksville", "waverly"],
    seeing: "Dr. Holder is currently seeing patients in our Clarksville and Waverly offices.",
    bio: [
      "Dr. Douglas Holder grew up in White House, Tennessee. Prior to podiatry school, he attended Austin Peay State University for his undergraduate education. He was heavily involved in community service on campus and throughout the Clarksville area. While in college at Austin Peay, he shadowed in the medical fields and became interested in podiatry. After his time in Clarksville, Dr. Holder moved to Independence, Ohio to complete podiatry school at Kent State University College of Podiatric Medicine. He then went on to complete his podiatric residency at The Jewish Hospital in Cincinnati, Ohio, where he was thoroughly trained in all aspects of conservative and surgical podiatric medicine.",
      "Dr. Holder is married to his wife and has a son. They enjoy spending time outdoors with their two dogs. Dr. Holder is excited to return to the Middle Tennessee area to see and help patients in Clarksville, Tennessee.",
    ],
  },

  "aaron-allred": {
    offices: ["smyrna"],
    seeing: "Dr. Allred is currently seeing patients in our Smyrna office.",
    bio: [
      "Dr. Aaron Allred is happy to join Neuhaus Foot and Ankle as the new podiatrist on staff. Dr. Allred received his Doctorate in Podiatric Medicine and Surgery from Des Moines University. He completed a three-year surgical residency in St. Louis, Missouri. Dr. Allred has been in private practice for ten years and is excited to be focused on providing expert care to those suffering from foot pain and other issues relating to lower extremity mechanics and function.",
      "Dr. Allred married his college sweetheart, and they have six wonderful daughters. He enjoys being \"#outdaughtered\" and coaching, cheering, and supporting his girls in all their activities. In his spare time, he enjoys the outdoors, live music, running, and hiking. Dr. Allred understands the importance of healthy, pain-free feet. He is happy to call Nashville home and looks forward to serving you!",
    ],
  },

  "ryan-thurston": {
    offices: ["murfreesboro", "shelbyville"],
    seeing: "Dr. Thurston is currently seeing patients in our Murfreesboro and Shelbyville offices.",
    bio: [
      "Dr. Ryan Thurston was born and raised in Idaho and earned his undergraduate degree in Physiology and Developmental Biology from Brigham Young University. Following his freshman year, he dedicated two years to serving a mission for the Church of Jesus Christ of Latter-day Saints in the Philippines. He later obtained his Doctorate of Podiatric Medicine from Midwestern University in Phoenix, Arizona. Dr. Thurston completed his residency at Rochester General Hospital in New York, where he received extensive training in both conservative and surgical treatments of forefoot, rearfoot, and ankle conditions.",
      "Dr. Thurston is married to his wonderful wife, and together they have two children. He enjoys spending quality time with his family, engaging in outdoor activities, playing sports, lifting weights, camping, hiking, and taking road trips. An avid food enthusiast, Dr. Thurston particularly enjoys discovering the best barbecue and relishes cooking, baking, and grilling with family and friends. He is enthusiastic about the opportunity to serve the people of Tennessee and looks forward to exploring the natural beauty the state has to offer.",
    ],
  },

  "jimmie-watkins": {
    offices: ["cookeville"],
    seeing: "Dr. Watkins is currently seeing patients in our Cookeville office.",
    bio: [
      "Originally from Arizona, Dr. Jimmie Watkins was born and raised in the state. He completed his undergraduate studies at Arizona State University, earning a Bachelor of Science degree in Human Nutrition. Dr. Watkins went on to receive his Doctorate of Podiatric Medicine from Western University of Health Sciences. He then completed his residency at HCA West Florida Oak Hill Hospital in Brooksville, Florida.",
      "Dr. Watkins is married to his high school sweetheart, and together they have one son. He enjoys spending quality time with his family, exploring the outdoors, and listening to country music. Dr. Watkins is actively involved in his son's activities, including 4-H, baseball, rugby, and rodeos. The family is excited to make Tennessee their new home and looks forward to becoming part of the community.",
    ],
  },

  "jeffrey-hurless": {
    offices: ["hermitage"],
    seeing: "Dr. Hurless is currently seeing patients in our Hermitage office.",
    bio: [
      "Dr. Jeffrey S. Hurless is a podiatrist and foot and ankle surgeon with a distinguished career spanning over two decades, dating back to 1999. He holds the title of Diplomate of the American Board of Foot and Ankle Surgery and is board-certified by the American College of Foot & Ankle Surgeons (ACFAS). Dr. Hurless began his academic journey at the University of Akron in Ohio, where he earned his undergraduate degree in Biology.",
      "Demonstrating unwavering commitment to academic excellence, he furthered his studies by obtaining a master's degree in physiology at the same institution. In San Francisco, Dr. Hurless pursued his doctorate at the California College of Podiatric Medicine, where he earned the highest honors. He refined his podiatry and surgical expertise through a rigorous residency training program at Kaiser Permanente in Santa Clara, CA, culminating in a comprehensive three-year surgical residency within the Department of Orthopedics.",
      "Beyond his clinical proficiency, Dr. Hurless is a respected lecturer, having delivered presentations across the nation on a wide range of topics, including orthotic therapy, sports medicine, and pediatric foot pathology.",
      "Dr. Hurless's dedication to his chosen field stems from the diverse patient population it affords him the privilege to serve, ranging from infants to elderly grandparents. With a substantial track record of successful bunionectomies and reconstructive forefoot surgeries, Dr. Hurless has solidified his reputation as an accomplished expert in the field.",
      "Beyond his role as a dedicated healthcare professional, he is a devoted husband and father of three, taking great pride in fostering a true family-oriented medical practice. In his spare time, he enjoys playing golf, watching college football, wine tasting, and spending time with family and friends.",
    ],
  },

  "harpreet-khalsa": {
    offices: ["nashville", "smyrna", "lebanon"],
    seeing: "Dr. Khalsa is seeing patients in our Nashville (Midtown), Smyrna, and Lebanon offices.",
    bio: [
      "Dr. Khalsa completed their undergraduate studies at Indiana University before earning their medical degree from the Kent State University College of Podiatric Medicine. Following medical school, Dr. Khalsa pursued an intensive surgical residency at United Health Services Hospital in New York, where they gained comprehensive training in advanced podiatric surgical techniques.",
      "With a patient-centered approach and multilingual skills, Dr. Khalsa is passionate about fostering clear communication and ensuring personalized care for diverse communities. Whether addressing common foot ailments or complex surgical needs, Dr. Khalsa is dedicated to helping patients achieve optimal foot health and improved quality of life.",
      "Dr. Khalsa speaks English, Hindi, and Punjabi.",
    ],
  },

  "alec-wroblewski": {
    offices: ["clarksville"],
    seeing: "Dr. Wroblewski is seeing patients in our Clarksville office.",
    bio: [
      "Dr. Alec Wroblewski brings a grounded, patient-first approach to foot and ankle care, shaped by his small-town upbringing and strong values of hard work, integrity, and service. He is committed to building genuine relationships with his patients and takes pride in providing thoughtful, personalized care that helps people stay active and improve their quality of life.",
      "Dr. Wroblewski believes the best outcomes come from trust, clear communication, and a collaborative approach. Whether treating everyday foot pain or more complex conditions, he focuses on helping patients understand their options and feel confident in their care.",
      "He completed his podiatric medicine and surgery residency with advanced training in reconstructive rearfoot and ankle surgery at Atrium Health Wake Forest Baptist Medical Center. His clinical interests include forefoot and rearfoot surgery, ankle procedures, diabetic limb salvage, trauma care, and elective reconstructive surgery. He remains actively engaged in research and continuing education to stay at the forefront of foot and ankle care.",
    ],
  },

  "richard-lavigna": {
    offices: ["brentwood"],
    seeing: "Dr. Lavigna is seeing patients in our Brentwood office.",
    bio: [
      "Dr. Richard Lavigna is a podiatrist at Neuhaus Foot & Ankle, seeing patients in Brentwood. Call our office to book a visit with him.",
    ],
  },
};
