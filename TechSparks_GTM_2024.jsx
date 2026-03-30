import { useState, useMemo } from "react";

// 200 TechSparks 2024 contacts — array format: [id,name,title,company,category,sector,city,email,ec,li,fs,lf,persona,hook,score,tier]
const RAW = [["21","Phani Kishan Addepalli","Co-founder & CGO","Swiggy","Speaker / Found","Food Delivery","Bengaluru","phani.kishan@swiggy.in","H","phani-kishan","L","","FoodTech Unicorn Co-founder","CGO Swiggy; listed company; hyperlocal delivery at scale",100,"A"],["78","Anupam Mittal","Founder & CEO","People Group / Shaadi.com","Featured Founde","Matchmaking / Angel","Mumbai","anupam@shaadi.com","M","anupmittal","Priv","","Serial Investor & Founder","Founder Shaadi.com; Shark Tank India Judge; prolific angel investor",100,"A"],["87","Arjun Vaidya","Co-founder / Partner","Dr. Vaidya's / V3 Venture","Featured Founde","D2C / HealthTech","Mumbai","arjun@drvaidyas.com","H","arjunvaidya","Acq","","D2C Founder & Investor","Founder Dr. Vaidya's (acquired by HUL); investor V3 Ventures",100,"A"],["114","Phanindra Sama","Co-founder & Partner","Avaana Capital","Investor / Foun","Mobility / VC","Bengaluru","phani@avaanacapital.com","M","phanindrasama","VC","$135M","Serial Founder & VC","Founder redBus; Partner Avaana Capital; climate-tech investor",100,"A"],["142","Manav Garg","Co-founder & Partner","Together Fund","Investor / Foun","SaaS / VC","Bengaluru","manav@togetherfund.in","H","manavgarg","VC","$100M","Founder & VC","Founder Eka Software; investor Together Fund; SaaS builder",100,"A"],["152","Sanjeev Bikhchandani","Founder & Vice Chairman","Info Edge (Naukri.com)","Featured Founde","Internet / Job Porta","Delhi","sanjeev@infoedge.in","M","sanjeevbikhchandani","L","","Internet Pioneer Founder","Founder Naukri; Info Edge investor in Zomato PolicyBazaar",100,"A"],["191","Rohan Verma","CEO & Executive Director","MapmyIndia (CE Info Syste","Speaker / Found","Geospatial / Maps","Delhi","rohan.verma@mapmyindia.com","H","rohanverma","L","","Geospatial Listed CEO","CEO MapmyIndia; India's sovereign geospatial data platform",100,"A"],["196","K Ganesh","Serial Entrepreneur / Promot","GrowthStory","Featured Founde","Serial Entrepreneur ","Bengaluru","kg@growthstory.in","H","kganesh","VC","","Hyper Serial Founder & Investor","Built BigBasket Portea Bluestone; 8x entrepreneur; GrowthStory",100,"A"],["8","Harshil Mathur","Co-founder & CEO","Razorpay","Speaker / Found","Fintech","Bengaluru","harshil@razorpay.com","H","harshilmathur","LS","$375M","Fintech Unicorn Founder","CEO Razorpay; payments infra for 8M+ businesses",99,"A"],["9","Shashank Kumar","Co-founder & MD","Razorpay","Speaker / Found","Fintech","Bengaluru","shashank.kumar@razorpay.com","H","shashank-kumar-razorpay","LS","$375M","Fintech Unicorn Co-founder","MD Razorpay; banking infra & neobanking for India",99,"A"],["14","Amrit Acharya","Co-founder & CEO","Zetwerk","Speaker / Found","B2B Manufacturing","Bengaluru","amrit@zetwerk.com","H","amritacharya","LS","$120M","B2B Manufacturing Unicorn Founder","CEO Zetwerk; global manufacturing marketplace unicorn",99,"A"],["43","Rahul Chari","Founder & CTO","PhonePe","Speaker / Found","Fintech / Payments","Bengaluru","rahul.chari@phonepe.com","H","rahulchari","LS","$1B","Fintech Unicorn CTO","CTO PhonePe; UPI infrastructure at 500M+ transactions/day",99,"A"],["75","Gaurav Munjal","Co-founder & CEO","Unacademy","Speaker / Found","Edtech","Bengaluru","gaurav@unacademy.com","H","gauravmunjal","LS","$440M","Edtech Unicorn Founder","CEO Unacademy; India's 2nd largest edtech platform",99,"A"],["84","Tarun Mehta","Co-founder & CEO","Ather Energy","Speaker / Found","EV / CleanTech","Bengaluru","tarun@atherenergy.com","H","tarunmehta","LS","$300M","EV Unicorn Founder","CEO Ather Energy; premium electric scooter maker; recent IPO",99,"A"],["122","Rahul Garg","Founder & CEO","Moglix","Speaker / Found","B2B Commerce","Noida","rahul@moglix.com","H","rahulgarg","LS","$250M","B2B Commerce Unicorn Founder","CEO Moglix; B2B industrial supply chain unicorn",99,"A"],["125","Sameer Nigam","Co-founder & CEO","PhonePe","Speaker / Found","Fintech / Payments","Bengaluru","sameer@phonepe.com","H","sameernigam","LS","$1B","Fintech Unicorn Founder","CEO PhonePe; India's #1 UPI app; 500M+ registered users",99,"A"],["169","Abhiraj Bhal","Co-founder & CEO","Urban Company","Speaker / Found","Home Services","Gurugram","abhiraj@urbanclap.com","H","abhirajbhal","LS","$255M","Home Services Unicorn Founder","CEO Urban Company; tech-enabled home services unicorn",99,"A"],["16","Lalit Keshre","Co-founder & CEO","Groww","Speaker / Found","Fintech / WealthTech","Bengaluru","lalit@groww.in","H","lalitkeshre","G","$251M","WealthTech Unicorn Founder","CEO Groww; democratizing investing for 50M+ Indians",97,"A"],["73","Sumit Gupta","Co-founder & CEO","CoinDCX","Speaker / Found","Crypto / Web3","Mumbai","sumit@coindcx.com","H","sumitgupta","G","$135M","Crypto Unicorn Founder","CEO CoinDCX; India's 1st crypto unicorn; regulatory advocacy",97,"A"],["4","Bhavish Aggarwal","Founder & CEO","Ola","Speaker / Found","EV / Mobility","Bengaluru","bhavish@ola.com","M","bhavishaggarwal","L","","EV Unicorn Founder","Founder Ola & Ola Electric; keynote on Building Bharat 3.0",96,"A"],["24","Siddarth Pai","Founding Partner & CFO","3one4 Capital","Speaker / Inves","Venture Capital","Bengaluru","siddarth@3one4capital.com","H","siddarthpai","VC","$200M","VC Partner","CFO & Founding Partner 3one4; top early-stage VC in India",96,"A"],["25","Alok Goyal","Partner","Stellaris Venture Partner","Speaker / Inves","Venture Capital","Bengaluru","alok@stellarisvp.com","H","alokgoyal","VC","$225M","VC Partner","Partner Stellaris; SaaS & consumer internet investor",96,"A"],["27","Mukul Arora","Co-Managing Partner","Elevation Capital","Speaker / Inves","Venture Capital","Delhi","mukul@elevationcapital.com","H","mukularora","VC","$670M","VC Partner","Co-MP Elevation Capital; backed Meesho SwiggyOyo etc",96,"A"],["62","Vipul Parekh","Co-founder","Mamaearth (Honasa Consume","Speaker / Found","D2C / FMCG","Gurugram","vipul@mamaearth.in","M","vipulparekh","L","","D2C FMCG Unicorn Co-founder","Co-founder Mamaearth; first D2C FMCG company listed in India",96,"A"],["63","Varun Alagh","Co-founder & CEO","Mamaearth (Honasa Consume","Speaker / Found","D2C / FMCG","Gurugram","varun@mamaearth.in","M","varunalagh","L","","D2C FMCG Unicorn Founder","CEO Mamaearth; from baby care to multi-brand beauty house",96,"A"],["155","Girish Mathrubootham","Founder & CEO","Freshworks","Featured Founde","SaaS / CRM","Chennai","girish@freshworks.com","H","girishmathrubootham","L","$1B","SaaS Unicorn Founder","Founder Freshworks; India's Nasdaq-listed SaaS pioneer",96,"A"],["3","Ronnie Screwvala","Co-founder","upGrad","Speaker / Found","Edtech","Mumbai","ronnie@upgrad.com","M","ronniescrewvala","LS","Undisclosed","Edtech Unicorn Founder","Co-founded upGrad; spoken about India's edtech leadership",95,"A"],["7","Naveen Tewari","Founder & CEO","InMobi Group","Speaker / Found","AdTech / AI","Bengaluru","naveen@inmobi.com","M","naveentewari","LS","$215M","AdTech Unicorn Founder","India's 1st Unicorn founder; AI-first ad platform builder",95,"A"],["19","Supriya Paul","Co-founder & CEO","Josh Talks","Speaker / Found","Content / Edtech","Delhi","supriya@joshtalks.com","H","supriyapaul","S","Undisclosed","Content Founder","Co-founder Josh Talks; vernacular inspiration content platform",95,"A"],["31","Sanjay Nekkanti","Co-founder & CEO","Dhruva Space","Speaker / Found","Spacetech","Hyderabad","sanjay@dhruvaspace.com","H","sanjaynekkanti","S","$40M","Spacetech Founder","India's 1st private spacetech company; satellite launch provider",95,"A"],["33","Baskar Subramanian","Co-founder & CEO","Amagi Media Labs","Speaker / Found","Media Tech / SaaS","Bengaluru","baskar@amagi.com","M","baskarsubramanian","LS","$100M","Media SaaS Unicorn Founder","CEO Amagi; cloud media SaaS unicorn serving global broadcasters",95,"A"],["48","Shradha Sharma","Founder & CEO","YourStory","Speaker / Found","Media / Tech","Bengaluru","shradha@yourstory.com","H","shradhasharma","S","$25M","Media Founder","Founder YourStory; India's #1 startup media platform",95,"A"],["61","Abhimanyu Saxena","Co-founder","Scaler Academy","Speaker / Found","Edtech","Bengaluru","abhimanyu@scaler.com","H","abhimanyusaxena","S","$55M","Edtech Co-founder","Co-founder Scaler; tech upskilling for 50K+ engineers",95,"A"],["77","Swati Bhargava","Co-founder","CashKaro","Speaker / Found","Cashback / Affiliate","Delhi","swati@cashkaro.com","H","swatibhargava","S","$20M","D2C Commerce Founder","Co-founder CashKaro; India's largest cashback platform",95,"A"],["81","Peyush Bansal","Co-founder & CEO","Lenskart","Featured Founde","D2C / Eyewear","Delhi","peyush@lenskart.com","H","peyushbansal","LS","$500M","D2C Eyewear Unicorn Founder","CEO Lenskart; Shark Tank India Judge; omnichannel eyewear unicorn",95,"A"],["157","Krishnan Menon","Co-founder","BharatPe","Speaker / Found","Fintech","Delhi","krishnan@bharatpe.com","M","krishnanmenon","LS","$370M","Fintech Unicorn Co-founder","Co-founder BharatPe; merchant payments and BNPL",95,"A"],["160","Vidit Aatrey","Co-founder & CEO","Meesho","Featured Founde","Social Commerce","Bengaluru","vidit@meesho.com","H","viditaatrey","LS","$570M","Social Commerce Unicorn Founder","CEO Meesho; 150M+ app users; India's fastest growing e-comm",95,"A"],["173","Siddharth Shah","Co-founder","Healthifyme","Speaker / Found","HealthTech / AI","Bengaluru","siddharth@healthifyme.com","H","siddharthshah","S","$75M","HealthTech Unicorn Co-founder","Co-founder Healthifyme; AI-powered fitness and nutrition unicorn",95,"A"],["26","Ashutosh Sharma","Head of Growth Investments I","Prosus Ventures","Speaker / Inves","Venture Capital","Bengaluru","ashutosh.sharma@prosus.com","M","ashutoshsharma","L","","Corporate VC Leader","Growth investments head at Prosus; $5B+ deployed in India",94,"A"],["10","Mabel Chacko","Co-founder & COO","Open Financial Technologi","Speaker / Found","Fintech","Bengaluru","mabel@open.money","M","mabelchacko","G","$50M","Neobank Co-founder","India's 100th Unicorn COO; neobanking for SMBs",93,"A"],["11","Anish Achuthan","Co-founder & CEO","Open Financial Technologi","Speaker / Found","Fintech","Bengaluru","anish@open.money","M","anishachuthan","G","$50M","Neobank Founder","CEO of Open; India's 100th Unicorn co-founder",93,"A"],["30","Shanti Mohan","Founder & CEO","LetsVenture","Speaker / Inves","Angel / VC Platform","Bengaluru","shanti@letsventure.com","H","shantimohan","S","$15M","Angel Platform Founder","Founder LetsVenture; India's largest angel syndication platform",93,"A"],["79","Vineeta Singh","Co-founder & CEO","SUGAR Cosmetics","Featured Founde","D2C / Beauty","Mumbai","vineeta@sugarcosmetics.com","H","vineetasingh","G","$50M","D2C Beauty Unicorn Founder","CEO SUGAR Cosmetics; Shark Tank India Judge; beauty unicorn",93,"A"],["124","Sujeet Kumar","Co-founder","Udaan","Speaker / Found","B2B Commerce","Bengaluru","sujeet@udaan.com","M","sujeetkumar","G","$340M","B2B Commerce Unicorn Co-founder","Co-founder Udaan; India's largest B2B trade platform",93,"A"],["131","Amod Malviya","Co-founder","Udaan","Speaker / Found","B2B Commerce","Bengaluru","amod@udaan.com","M","amodmalviya","G","$340M","B2B Unicorn Co-founder","Co-founder Udaan; former CTO Flipkart; B2B commerce builder",93,"A"],["192","Sai Srinivas","Co-founder & CEO","MPL (Mobile Premier Leagu","Speaker / Found","Gaming","Bengaluru","sai@mpl.live","M","saisrinivas","G","$150M","Gaming Unicorn Founder","CEO MPL; India's 2nd largest gaming platform; unicorn",93,"A"],["197","Meena Ganesh","Co-founder & CEO","GrowthStory / Portea Medi","Featured Founde","HealthTech","Bengaluru","meena@portea.com","H","meenaganesh","G","$75M","HealthTech Serial Founder","CEO Portea Medical; 8x founder; GrowthStory co-promoter",93,"A"],["200","Rishabh Lawania","Founder & CEO","Xeler8 / Wavemaker Partne","Featured Founde","Deeptech / VC","Bengaluru","rishabh@xeler8.com","M","rishabhlawania","VC","$30M","Deeptech VC Founder","Founder Xeler8; Wavemaker Partners; deeptech and hard-tech VC",93,"A"],["17","Kunal Bahl","Co-founder","Snapdeal & Titan Capital","Speaker / Inves","E-commerce / VC","Delhi","kunal@titankapital.com","M","kunalbahl","VC","","Serial Founder & Angel","Co-founder Snapdeal; active angel via Titan Capital",92,"A"],["72","Deepinder Goyal","Founder & CEO","Zomato (Eternal)","Featured Founde","Food Delivery / Hype","Gurugram","deepinder@zomato.com","M","deepindergoyal","L","","FoodTech Unicorn Founder","CEO Zomato (now Eternal); food + quick commerce + B2B",92,"A"],["83","Ghazal Alagh","Co-founder & CIO","Mamaearth","Featured Founde","D2C / FMCG","Gurugram","ghazal@mamaearth.in","M","ghazalalagh","L","","D2C Co-founder","CIO Mamaearth; Shark Tank India Judge; toxin-free beauty brand",92,"A"],["198","Vijay Shekhar Sharma","Founder & CEO","Paytm (One97 Communicatio","Featured Founde","Fintech / Super App","Noida","vijay@paytm.com","M","vijayshekhar","L","","Fintech Listed Founder","Founder Paytm; India's first fintech unicorn; IPO veteran",92,"A"],["18","Alakh Pandey","Founder & CEO","PhysicsWallah","Speaker / Found","Edtech","Noida","alakh@pw.live","M","alakhpandey","S","$100M","Edtech Unicorn Founder","India's 101st Unicorn; 10M+ students on platform",91,"A"],["20","Ananth Narayanan","Founder & CEO","Mensa Brands","Speaker / Found","D2C / Brand Aggregat","Bengaluru","ananth@mensabrands.com","M","ananthnarayanan","S","$135M","D2C Brand Aggregator Founder","India's fastest unicorn (6 months); D2C brand rollup",91,"A"],["82","Ritesh Agarwal","Founder & CEO","OYO","Featured Founde","Hospitality / Travel","Delhi","ritesh@oyorooms.com","M","riteshagarwal","LS","$660M","Hospitality Unicorn Founder","CEO OYO; youngest unicorn founder; global hospitality platform",91,"A"],["92","Dhiraj Rajaram","Founder & CEO","Mu Sigma","Speaker / Found","Data Science / Analy","Bengaluru","dhiraj@mu-sigma.com","M","dhirajrajaram","S","$204M","Data Analytics Unicorn Founder","Founder Mu Sigma; world's largest pure-play analytics firm",91,"A"],["193","Namita Thapar","Executive Director","Emcure Pharmaceuticals","Featured Invest","Pharma / Angel Inves","Pune","namita@emcure.co.in","M","namitathapar","L","","Pharma Leader & Angel","ED Emcure; Shark Tank India Judge; healthcare investor",90,"A"],["179","Harsh Jain","Co-founder & CEO","Dream11","Featured Founde","Gaming / Fantasy Spo","Mumbai","harsh@dream11.com","M","harshjain","G","$840M","Gaming Unicorn Founder","CEO Dream11; India's largest fantasy sports platform",89,"A"],["159","Pallav Nadhani","Co-founder & Angel Investor","FusionCharts","Featured Founde","SaaS / Angel","Mumbai","pallav@fusioncharts.com","M","pallavnadhani","Acq","","Bootstrapped Founder & Angel","Co-founder FusionCharts (acquired); prolific angel investor",88,"A"],["80","Aman Gupta","Co-founder & CMO","boAt Lifestyle","Featured Founde","D2C / Consumer Elect","Delhi","aman@imaginemarketingindia.com","M","amangupta","S","$60M","D2C Electronics Unicorn Founder","CMO boAt; Shark Tank India Judge; India's #1 wearables brand",87,"A"],["167","Hari Menon","Co-founder & CEO","BigBasket","Featured Founde","E-grocery / Retail","Bengaluru","hari.menon@bigbasket.com","M","harimenon","Acq","","E-grocery Unicorn Founder","CEO BigBasket; India's largest online grocery; Tata acquisition",85,"A"],["66","Ravi Soni","Partner","Stellaris Venture Partner","Investor","Venture Capital","Bengaluru","ravi@stellarisvp.com","H","ravisoni","VC","$225M","VC Partner","Partner Stellaris; early-stage SaaS and fintech investor",84,"A"],["95","Prashanth Prakash","Partner","Accel India","Investor","Venture Capital","Bengaluru","prashanth@accel.com","H","prashanthprakash","VC","$650M","Top VC Partner","Partner Accel India; backed Freshworks Swiggy Flipkart",84,"A"],["96","Prayank Swaroop","Partner","Accel India","Investor","Venture Capital","Bengaluru","prayank@accel.com","H","prayank","VC","$650M","VC Partner","Partner Accel India; SaaS and B2B investor",84,"A"],["97","Shekhar Kirani","Partner","Accel India","Investor","Venture Capital","Bengaluru","shekhar@accel.com","H","shekharkirani","VC","$650M","VC Partner - SaaS","Partner Accel; led investments in Browserstack Zenoti",84,"A"],["99","Nandini Mansinghka","Co-founder & CEO","Mumbai Angels","Investor","Angel Network","Mumbai","nandini@mumbaiangels.com","H","nandinimansinghka","VC","","Angel Network CEO","CEO Mumbai Angels; 600+ angels; 200+ portfolio companies",84,"A"],["100","Padmaja Ruparel","Co-founder","Indian Angel Network","Investor","Angel Network","Delhi","padmaja@indianangelnetwork.com","H","padmajaruparel","VC","","Angel Network Founder","Co-founder IAN; 500+ angels; India's oldest angel network",84,"A"],["102","Ashish Fafadia","Partner","Blume Ventures","Investor","Venture Capital","Mumbai","ashish@blume.vc","H","ashishfafadia","VC","$290M","VC Partner - Ops","Partner Blume Ventures; portfolio ops and finance",84,"A"],["103","Karthik Reddy","Managing Partner","Blume Ventures","Investor","Venture Capital","Mumbai","karthik@blume.vc","H","karthikreddy","VC","$290M","VC Managing Partner","MP Blume Ventures; 200+ portfolio; early stage champion",84,"A"],["104","Vani Kola","Founder & MD","Kalaari Capital","Investor","Venture Capital","Bengaluru","vani@kalaari.com","H","vanikola","VC","$290M","Top VC Founder","MD Kalaari; backed Dream11 Myntra Cult.fit",84,"A"],["106","Anand Lunia","Founding Partner","India Quotient","Investor","Venture Capital","Mumbai","anand@indiaquotient.in","H","anandlunia","VC","$100M","VC Founding Partner","Founding Partner India Quotient; Bharat-first VC fund",84,"A"],["108","Ishaan Mittal","Partner","Peak XV Partners","Investor","Venture Capital","Bengaluru","ishaan@peakxv.com","H","ishaanmittal","VC","$2.85B","Top VC Partner","Partner Peak XV; led investments in CRED Khatabook",84,"A"],["109","Rajan Anandan","MD","Peak XV Partners","Investor","Venture Capital","Bengaluru","rajan@peakxv.com","H","rajananandan","VC","$2.85B","VC MD - India","MD Peak XV; former VP Google India; prolific angel",84,"A"],["110","Sanjay Swamy","Managing Partner","Prime Venture Partners","Investor","Venture Capital","Bengaluru","sanjay@primevp.in","H","sanjayswamy","VC","$120M","VC Managing Partner","MP Prime VP; fintech & SaaS specialist; 50+ portfolio",84,"A"],["111","Amit Somani","Managing Partner","Prime Venture Partners","Investor","Venture Capital","Bengaluru","amit@primevp.in","H","amitsomani","VC","$120M","VC Managing Partner","MP Prime VP; former CPO MakeMyTrip; product-led investor",84,"A"],["113","Rehan Yar Khan","Managing Partner","Orios Venture Partners","Investor","Venture Capital","Mumbai","rehan@oriosvp.com","H","rehanyarkhan","VC","$100M","VC MP","MP Orios; backed Prettysecrets Country Delight Onsitego",84,"A"],["116","Shailesh Lakhani","MD","Peak XV Partners","Investor","Venture Capital","Bengaluru","shailesh@peakxv.com","H","shaileshlakhani","VC","$2.85B","VC MD - Consumer","MD Peak XV; consumer internet & D2C investment lead",84,"A"],["117","Arpit Agarwal","Partner","Blume Ventures","Investor","Venture Capital","Mumbai","arpit@blume.vc","H","arpitagarwal","VC","$290M","VC Partner - Deeptech","Partner Blume; deeptech & spacetech investment lead",84,"A"],["120","Nandan Nilekani","Co-founder & Chairman","EkStep Foundation / Infos","Featured Speake","Aadhaar / DPI","Bengaluru","nandan@nilekani.org","M","nandannilekani","L","","DPI Visionary","Aadhaar architect; DPI evangelist; Infosys co-founder",84,"A"],["133","Sanjay Mehta","Founder & Partner","100X.VC","Investor","Angel / VC","Mumbai","sanjay@100x.vc","H","sanjaymehta100x","VC","$20M/$yr","Angel / Early Stage VC","Founder 100X.VC; 100 startups per year funding model",84,"A"],["144","Harsha Kumar","Partner","Lightspeed India Partners","Investor","Venture Capital","Bengaluru","harsha@lightspeedvp.com","H","harshakumar","VC","$500M","VC Partner - Consumer","Partner Lightspeed; consumer internet specialist",84,"A"],["145","Bejul Somaia","Partner","Lightspeed India Partners","Investor","Venture Capital","Bengaluru","bejul@lightspeedvp.com","H","bejulsomaia","VC","$500M","VC Partner - Enterprise","Partner Lightspeed; backed OYO Udaan ShareChat",84,"A"],["146","Pankaj Makkar","MD","Bertelsmann India Investm","Investor","Venture Capital","Delhi","pankaj@bii.in","H","pankajmakkar","VC","$100M","VC MD India","MD Bertelsmann India; edtech & consumer internet specialist",84,"A"],["148","Tarun Davda","MD","Matrix Partners India","Investor","Venture Capital","Mumbai","tarun@matrixpartners.in","H","tarundavda","VC","$525M","VC MD India","MD Matrix Partners India; backed Ola Razorpay Dailyhunt",84,"A"],["149","Vikram Vaidyanathan","MD","Matrix Partners India","Investor","Venture Capital","Bengaluru","vikram@matrixpartners.in","H","vikramvaidyanathan","VC","$525M","VC MD - Growth","MD Matrix Partners India; growth and SaaS focus",84,"A"],["150","Rajesh Raju","Managing Partner","Kalaari Capital","Investor","Venture Capital","Bengaluru","rajesh@kalaari.com","H","rajeshraju","VC","$290M","VC Managing Partner","MP Kalaari Capital; enterprise and consumer tech investor",84,"A"],["151","Naganand Doraswamy","Founder & CEO","Ideaspring Capital","Investor","Venture Capital / De","Bengaluru","naganand@ideaspringcapital.com","H","naganand","VC","$50M","Deeptech VC Founder","Founder Ideaspring Capital; India's specialist deeptech VC",84,"A"],["165","Hemant Mohapatra","Partner","Lightspeed India Partners","Investor","Venture Capital","Bengaluru","hemant@lightspeedvp.com","H","hemantmohapatra","VC","$500M","VC Partner - Deeptech","Partner Lightspeed; deeptech enterprise & AI investor",84,"A"],["176","Rajesh Sawhney","Founder","GSF Accelerator","Investor / Ment","Angel / Accelerator","Delhi","rajesh@gsfindia.com","H","rajeshsawhney","VC","","Angel Investor & Accelerator Founder","Founder GSF Accelerator; 200+ portfolio; prolific angel",84,"A"],["194","Ashneer Grover","Founder & CEO","Third Unicorn","Featured Founde","Fintech / New Ventur","Delhi","ashneer@thirdunicorn.com","M","ashneergrover","E","Undisclosed","Serial Founder","Ex Co-founder BharatPe; Shark Tank India Judge; building Third Unicorn",84,"A"],["35","Srikanth Iyer","Co-founder & CEO","Homelane","Speaker / Found","Home Interior / D2C","Bengaluru","srikanth@homelane.com","H","srikanth-iyer","G","$30M","Home Interior Founder","CEO Homelane; tech-enabled home interiors at scale",82,"A"],["5","Dr. Rohini Srivathsa","CTO","Microsoft India and South","Speaker","AI / Enterprise Tech","Bengaluru","rohini.srivathsa@microsoft.com","H","rohinisrivathsa","L","","Enterprise Tech Leader","National Technology Officer then CTO Microsoft India; AI for India advocate",80,"A"],["15","Srinath Ramakkrushnan","Co-founder & COO","Zetwerk","Speaker / Found","B2B Manufacturing","Bengaluru","srinath@zetwerk.com","M","srinathramakkrushnan","LS","$120M","Manufacturing Unicorn Co-founder","COO Zetwerk; supply chain & global ops",80,"A"],["23","Vishal Dhupar","Managing Director Asia South","NVIDIA","Speaker","AI / Semiconductors","Bengaluru","vishal.dhupar@nvidia.com","H","vishaldhupar","L","","AI Infrastructure Leader","MD NVIDIA Asia South; GPU & AI infra for India",80,"A"],["76","Madhusudhan Rao","Co-founder","Unacademy","Speaker / Found","Edtech","Bengaluru","madhusudhan@unacademy.com","M","madhusudhanrao","LS","$440M","Edtech Unicorn Co-founder","Co-founder Unacademy; tech infrastructure for online learning",80,"A"],["85","Swapnil Jain","Co-founder & CTO","Ather Energy","Speaker / Found","EV / CleanTech","Bengaluru","swapnil@atherenergy.com","M","swapniljain","LS","$300M","EV Unicorn CTO","CTO Ather Energy; EV hardware and software platform",80,"A"],["98","Kannan Sitaram","Venture Partner","Fireside Ventures","Investor","Venture Capital / D2","Bengaluru","kannan@firesideventures.in","M","kannansitaram","VC","$225M","D2C VC Partner","VP Fireside Ventures; India's specialist D2C consumer fund",80,"A"],["143","Jatin Desai","MD India","Lightspeed India Partners","Investor","Venture Capital","Bengaluru","jatin@lightspeedvp.com","M","jatindesai","VC","$500M","VC MD India","MD Lightspeed India; consumer and B2B tech investor",80,"A"],["170","Varun Khaitan","Co-founder","Urban Company","Speaker / Found","Home Services","Gurugram","varun@urbanclap.com","M","varunkhaitan","LS","$255M","Home Services Unicorn Co-founder","Co-founder Urban Company; supply & ops excellence",80,"A"],["187","Anant Maheshwari","President","Microsoft India","Speaker","Cloud / AI / Enterpr","Delhi","amaheshwari@microsoft.com","H","anantmaheshwari","L","","Big Tech India President","President Microsoft India; AI Copilot + Azure India champion",80,"A"],["189","Anand Chandrasekaran","Partner","General Catalyst","Investor","Venture Capital","Bengaluru","anand@generalcatalyst.com","M","anandc","VC","$4.6B","VC Partner - India","Partner GC India; ex-Yahoo APAC; consumer internet specialist",80,"A"],["12","Ajeesh Achuthan","Co-founder","Open Financial Technologi","Speaker / Found","Fintech","Bengaluru","ajeesh@open.money","M","ajeeshachuthan","G","$50M","Neobank Co-founder","Co-founder Open Financial Technologies",78,"B"],["13","Deena Jacob","Co-founder & CFO","Open Financial Technologi","Speaker / Found","Fintech","Bengaluru","deena@open.money","M","deenajacob","G","$50M","Fintech CFO / Co-founder","CFO & Co-founder Open; financial ops for neobanking",78,"B"],["123","Deepak Garg","Founder & CEO","Rivigo","Speaker / Found","Logistics / Supply C","Gurugram","deepak@rivigo.com","M","deepakgarg","G","$220M","Logistics Unicorn Founder","Founder Rivigo; tech-driven trucking & relay logistics",78,"B"],["132","Vaibhav Gupta","Co-founder","Udaan","Speaker / Found","B2B Commerce","Bengaluru","vaibhav@udaan.com","M","vaibhavgupta","G","$340M","B2B Unicorn Co-founder","Co-founder Udaan; ex-Flipkart supply chain & ops",78,"B"],["168","Ganesh Krishnan","Co-founder","Portea Medical","Speaker / Found","HealthTech","Bengaluru","ganesh@portea.com","M","ganeshkrishnan","G","$75M","HealthTech Founder","Co-founder Portea Medical; India's largest home healthcare",78,"B"],["181","Ranjeet Pratap Singh","Founder & CEO","Pratilipi","Speaker / Found","Content / Vernacular","Bengaluru","ranjeet@pratilipi.com","M","ranjeetpratapsingh","G","$50M","Vernacular Content Founder","Founder Pratilipi; India's largest vernacular storytelling platform",78,"B"],["28","Mandeep Julka","Vice President","Chiratae Ventures","Speaker / Inves","Venture Capital","Bengaluru","mandeep@chiratae.com","M","mandeepjulka","VC","Undisclosed","VC VP","VP Chiratae; consumer & enterprise portfolio",77,"B"],["29","Bikram Mahagan","Partner","Unicorn India Ventures","Speaker / Inves","Venture Capital","Mumbai","bikram@unicornindia.in","M","bikrammahagan","VC","$50M","VC Partner","Partner Unicorn India Ventures; India-focused early stage",77,"B"],["32","Roopa Kumar","Founder & Group CEO","Purple Quarter","Speaker / Found","Executive Search / H","Bengaluru","roopa@purplequarter.com","H","roopakumar","E","Undisclosed","HR Tech Founder","Founder Purple Quarter; CXO search for Indian startups",77,"B"],["154","Sumit Jain","Co-founder & CEO","Housing.com","Featured Founde","PropTech","Bengaluru","sumit@housing.com","M","sumitjain","L","","PropTech Founder","Co-founder Housing.com; India's #2 real estate platform",77,"B"],["42","Sandeep Sinha","Co-founder & Co-CEO","OISTER","Speaker / Found","Telecom / IoT","Delhi","sandeep@oister.io","M","sandeepsinha","S","$30M","IoT Telecom Founder","Co-CEO OISTER; IoT connectivity infrastructure",76,"B"],["88","Pallavi Shrivastava","Co-founder","Pepper Content","Speaker / Found","Content Marketing / ","Mumbai","pallavi@peppercontent.io","M","pallavishrivastava","S","$14.3M","Content SaaS Founder","Co-founder Pepper Content; AI-powered content marketplace",76,"B"],["91","Karan Bajwa","VP Cloud","Google India","Speaker","Cloud / AI","Bengaluru","kbajwa@google.com","M","karanbajwa","L","","Cloud Leader","VP Cloud Google India; Google Cloud for Indian enterprises",76,"B"],["101","Maheshwar Peri","Founder & Chairman","Careers360","Speaker / Found","Edtech / Media","Delhi","maheshwar@careers360.com","M","maheshwarperi","S","$25M","Edtech Media Founder","Founder Careers360; India's #1 education discovery platform",76,"B"],["166","Ruchita Dar Shah","Founder","Momspresso","Speaker / Found","Content / Community","Delhi","ruchita@momspresso.com","M","ruchitadarshah","S","$5M","Content Community Founder","Founder Momspresso (MomComm); India's top women content platform",76,"B"],["172","Anurag Avula","CEO","Shopmatic","Speaker / Found","E-commerce / SaaS","Bengaluru","anurag@shopmatic.com","M","anuragavula","S","$23M","E-commerce SaaS Founder","CEO Shopmatic; e-commerce enablement for SMBs in Asia",76,"B"],["174","Tushar Vashisht","Co-founder & CEO","Healthifyme","Speaker / Found","HealthTech / AI","Bengaluru","tushar@healthifyme.com","M","tusharvashisht","S","$75M","HealthTech Unicorn Founder","CEO Healthifyme; 35M+ users; AI diet and fitness coach",76,"B"],["182","Rohit MA","Co-founder","Yulu Bikes","Speaker / Found","Micro Mobility / EV","Bengaluru","rohit@yulu.bike","M","rohitma","S","$82M","EV Micro Mobility Founder","Co-founder Yulu; Bajaj-backed EV bike rental platform",76,"B"],["183","Amit Gupta","Co-founder & CEO","Yulu Bikes","Speaker / Found","Micro Mobility / EV","Bengaluru","amit@yulu.bike","M","amitgupta","S","$82M","EV Micro Mobility CEO","CEO Yulu; urban EV micro-mobility and last-mile logistics",76,"B"],["184","Sandeep Aggarwal","Founder","Droom","Featured Founde","E-commerce / Automot","Gurugram","sandeep@droom.in","M","sandeepaggarwal","LS","$200M","Auto E-commerce Founder","Founder Droom; India's largest used vehicle marketplace",76,"B"],["190","Abhishek Sharma","Co-founder & CEO","Ecozen Solutions","Speaker / Found","CleanTech / AgriTech","Pune","abhishek@ecozensolutions.com","M","abhisheksharma","S","$30M","CleanTech Founder","CEO Ecozen; solar-powered cold chain solutions for farmers",76,"B"],["195","Tejashree Rao","MD India","Amazon Web Services (AWS)","Speaker","Cloud / AI","Bengaluru","tejashree.rao@amazon.com","M","tejashreerao","L","","Cloud Business Leader","MD AWS India; cloud infrastructure and AI services for India",76,"B"],["49","Phalguni Anand","MD & CEO","Haptik","Speaker / Found","AI / Conversational ","Mumbai","phalguni@haptik.ai","M","phalgunianand","Acq","","AI Conversational Leader","CEO Haptik (JioHaptik); enterprise conversational AI at scale",74,"B"],["67","Nikhil Kamath","Co-founder","Zerodha & True Beacon","Featured Founde","Fintech / Investment","Bengaluru","nikhil@zerodha.com","M","nikhilkamath","Boot","","Co-founder @ Zerodha & True Beacon","#founder #investor #fintech #angel",74,"B"],["74","Siddharth Menon","Co-founder & COO","WazirX","Speaker / Found","Crypto / Web3","Mumbai","siddharth@wazirx.com","M","siddharthmenon","Acq","","Crypto Founder","Co-founder WazirX; crypto exchange; India policy advocacy",74,"B"],["180","Bhavit Sheth","Co-founder & COO","Dream11","Featured Founde","Gaming / Fantasy Spo","Mumbai","bhavit@dream11.com","M","bhavitsheth","G","$840M","Gaming Unicorn Co-founder","COO Dream11; product & operations; IPL sponsorship wins",74,"B"],["65","Kishore Indukuri","Founder & CEO","Sid's Farm","Speaker / Found","Agritech / Dairy","Hyderabad","kishore@sidsfarm.com","M","kishoreindukuri","E","$5M","Agritech Founder","Founder Sid's Farm; direct-to-home dairy subscription",73,"B"],["70","Siddhartha Das","Founder","Evo Mobility","Speaker / Found","EV / Mobility","Bengaluru","siddhartha@evomobility.in","M","siddharthadass","E","$5M","EV Startup Founder","Founder Evo Mobility; EV fleet management solutions",73,"B"],["93","Pravin Jadhav","Founder & CEO","Raise Financial Services","Speaker / Found","Fintech","Mumbai","pravin@raise.money","M","pravinjadhav","E","$15M","Fintech Founder","Founder Raise; former COO Paytm Money; fintech builder",73,"B"],["185","Aakash Anand","Founder & CEO","Bella Vita Organic","Speaker / Found","D2C / Beauty","Delhi","aakash@bellavitaorganic.com","M","aakashanand","E","$5M","D2C Beauty Founder","Founder Bella Vita; Shark Tank India alum; natural beauty brand",73,"B"],["163","Mitali Nikore","Founder","Nikore Associates","Speaker / Found","Policy / Women Entre","Delhi","mitali@nikoreassociates.com","M","mitalipandya","Priv","","Policy Founder","Founder Nikore Associates; women & gig economy policy expert",71,"B"],["36","Srinivas Rao Mahankali","CEO","T-Hub","Speaker","Innovation / Gov Bod","Hyderabad","srinivas@t-hub.co","H","srinivasraomahankali","Gov","","Innovation Ecosystem Leader","CEO T-Hub; India's largest startup incubator (Telangana govt)",70,"B"],["130","Sharad Sharma","Co-founder","iSPIRT Foundation","Speaker","Policy / Startup Eco","Bengaluru","sharad@ispirt.in","H","sharadsharma","Non-","","Ecosystem Builder","Co-founder iSPIRT; India Software Product Industry think-tank",70,"B"],["57","Bhawna Singh","Country Manager India","Okta","Exhibitor","Cybersecurity / Iden","Bengaluru","bhawna.singh@okta.com","H","bhawnasingh","L","","Cybersecurity Leader","Country Manager Okta India; identity & zero-trust security",68,"B"],["59","Neha Singh","Co-founder","Tracxn","Exhibitor","Market Intelligence ","Bengaluru","neha@tracxn.com","H","nehasingh","L","","SaaS Market Intel Co-founder","Co-founder Tracxn; market intelligence for VCs and enterprises",68,"B"],["135","Ravi Trivedi","Founder & CEO","IndiQube","Exhibitor / Fou","Flexible Workspace /","Bengaluru","ravi@indiqube.com","M","ravitrivedi","LS","","Flexible Workspace Founder","Founder IndiQube; listed flex office space provider",68,"B"],["119","Dilip Asbe","MD & CEO","NPCI","Speaker","Fintech / Infrastruc","Mumbai","md@npci.org.in","M","dilipasbe","Gov","","DPI Infrastructure Leader","CEO NPCI; UPI architect; $100B digital payments infra",66,"B"],["22","Rohit Kapoor","CEO Food Marketplace","Swiggy","Speaker","Food Delivery","Bengaluru","rohit.kapoor@swiggy.in","H","rohitkapoor1","L","","Food Marketplace Leader","CEO Swiggy Food Marketplace; growth & ops leader",65,"B"],["38","Tapan Sahoo","Executive Officer Head of Di","Maruti Suzuki India","Speaker","Automotive / Digital","Gurugram","tapan.sahoo@maruti.co.in","H","tapansahoo","L","","Automotive Digital Leader","Digital transformation lead Maruti Suzuki; EV & IoT push",65,"B"],["68","Pratekk Agarwaal","General Partner","GrowX Ventures","Investor","Venture Capital","Mumbai","pratekk@growxventures.com","M","pratekkagerwaal","VC","$20M","Early Stage VC","GP GrowX; consumer & B2C early stage investor",65,"B"],["107","Rohan Malhotra","General Partner","Good Capital","Investor","Venture Capital","Bengaluru","rohan@goodcapital.in","M","rohanmalhotra","VC","$30M","VC GP","GP Good Capital; mission-driven and impact-focused startups",65,"B"],["112","Anup Jain","Managing Partner","Orios Venture Partners","Investor","Venture Capital","Mumbai","anup@oriosvp.com","M","anupjain","VC","$100M","VC MP","MP Orios VP; consumer & fintech early-stage investor",65,"B"],["128","Sohini Rajola","Partner","Iron Pillar","Investor","Venture Capital","Bengaluru","sohini@ironpillar.com","M","sohinirajola","VC","$150M","VC Partner","Partner Iron Pillar; growth-stage technology investor India",65,"B"],["147","Sudheer Kuppam","MD Asia Pacific","Microsoft M12","Investor","Corporate VC","Bengaluru","skuppam@microsoft.com","M","sudheerkuppam","VC","","Corporate VC Leader","MD Microsoft M12 APAC; corporate VC for AI & cloud startups",65,"B"],["177","Kanwal Rekhi","Managing Director","Inventus Capital Partners","Investor","Venture Capital","Bengaluru","kanwal@inventuscap.com","M","kanwalrekhi","VC","$90M","VC MD","MD Inventus; Silicon Valley-to-India VC bridge fund",65,"B"],["6","Nithin Kamath","Founder & CEO","Zerodha","Speaker / Found","Fintech","Bengaluru","nithin@zerodha.com","H","nithinkamath","Boot","","Founder & CEO @ Zerodha","#speaker #founder #fintech #bootstrapped #unicorn",64,"B"],["60","Sachin Smarta","Founder & CEO","Builder.ai","Exhibitor","AI / App Development","Bengaluru","sachin@builder.ai","M","sachinsmarta","G","$250M","AI Dev Platform Founder","Founder Builder.ai; no-code AI app development platform",61,"B"],["69","Siddharth Lal","MD & CEO","Eicher Motors / Royal Enf","Speaker / CEO","Automotive / EV","Gurugram","siddharth.lal@eicher.in","M","siddharthlal","L","","Automotive CEO","CEO Eicher Motors; Royal Enfield global expansion & EV roadmap",61,"B"],["71","Vivek Sunder","COO","Swiggy","Speaker","Food Delivery","Bengaluru","vivek.sunder@swiggy.in","M","viveksunder","L","","FoodTech COO","COO Swiggy; operations & supply chain for 500+ cities",61,"B"],["105","Srini Gopalan","MD & CEO","Vodafone Idea","Speaker","Telecom","Mumbai","srini.gopalan@vodafoneidea.com","M","srinigopalan","L","","Telecom CEO","CEO Vi (Vodafone Idea); 5G and digital transformation",61,"B"],["115","Sriram Natarajan","President","Mphasis","Speaker","IT Services / AI","Bengaluru","sriram.natarajan@mphasis.com","M","sriramnatarajan","L","","IT Services Leader","President Mphasis; AI-led IT services for global enterprises",61,"B"],["136","Meghna Agarwal","Founder & CEO","Hakki Africa","Exhibitor / Fou","Agritech / Africa","Bengaluru","meghna@hakki.africa","M","meghna-agarwal","E","$5M","Agritech Africa Founder","Founder Hakki Africa; agri marketplace for smallholder farmers Africa",61,"B"],["153","Hitesh Oberoi","MD & CEO","Info Edge","Speaker","Recruitment / SaaS","Delhi","hitesh@infoedge.in","M","hiteshoberoi","L","","Internet CEO","CEO Info Edge; Naukri 99acres Jeevansathi Shiksha",61,"B"],["171","Raghav Gupta","MD India & APAC","Coursera","Speaker","Edtech / Online Lear","Bengaluru","raghav.gupta@coursera.org","M","raghavgupta","L","","Edtech Business Leader","MD Coursera India APAC; higher education & skilling",61,"B"],["178","Shailen Garg","Founder & CEO","Kiwi","Exhibitor / Fou","Fintech / Credit Car","Bengaluru","shailen@kiwi.credit","M","shailengarg","E","$13M","Fintech Startup Founder","Founder Kiwi; UPI-on-credit card rewards platform",61,"B"],["44","Vishal Gupta","CEO PhonePe Insurance","PhonePe","Speaker","Fintech / Insurtech","Bengaluru","vishal.gupta@phonepe.com","M","vishalguptaphonepe","LS","$1B","Insurtech Business Leader","CEO PhonePe Insurance; embedded insurance at scale",60,"B"],["50","Arjun Mohan","CEO India","upGrad","Speaker","Edtech","Mumbai","arjun.mohan@upgrad.com","M","arjunmohan","LS","$210M","Edtech Business Leader","CEO India upGrad; online degrees and skilling platform",60,"B"],["118","Anurag Dahiya","CBO","PhonePe","Speaker","Fintech / Payments","Bengaluru","anurag.dahiya@phonepe.com","M","anuragdahiya","LS","$1B","Fintech CBO","CBO PhonePe; business development and merchant growth",60,"B"],["158","Nalin Negi","CEO","BharatPe","Speaker","Fintech","Delhi","nalin@bharatpe.com","M","nalinnegi","LS","$370M","Fintech CEO","CEO BharatPe; steering post-controversy growth",60,"B"],["137","Navdeep Munjal","MD","Hero Electric","Speaker","EV / CleanTech","Delhi","navdeep@heroelectric.in","M","navdeepmunjal","G","$52M","EV Manufacturer MD","MD Hero Electric; India's largest electric 2-wheeler brand",58,"B"],["34","Krishnendu Majumdar","CPTO","Yubi","Speaker","Fintech","Bengaluru","krishnendu.majumdar@yubi.co","M","krishnendumajumdar","S","$137M","Fintech CTO","CPTO Yubi (formerly CredAvenue); debt marketplace platform",56,"B"],["188","Pradeep Gupta","Founder & Chairman","CyberMedia","Speaker / Found","Media / Tech Analysi","Delhi","pradeep@cybermedia.co.in","M","pradeepgupta","Priv","","Tech Media Founder","Founder CyberMedia; India's largest tech publishing group",56,"B"],["94","Neeraj Bansal","Partner","KPMG India","Speaker","Consulting / Advisor","Delhi","neeraj.bansal@kpmg.com","H","neerajbansal","Part","","Consulting Leader","Partner KPMG; startup ecosystem advisory and M&A",55,"B"],["127","Vivek Belgavi","Partner Fintech","PwC India","Speaker","Consulting / Fintech","Mumbai","vivek.belgavi@pwc.com","H","vivekbelgavi","Part","","Fintech Consulting Leader","Partner PwC India; fintech & financial services advisory",55,"B"],["186","Rachit Mathur","MD","BCG Digital Ventures Indi","Speaker","Consulting / Digital","Bengaluru","rachitmathur@bcg.com","H","rachitmathur","Part","","Digital Consulting MD","MD BCG DV India; digital build and venture studio",55,"B"],["37","Deepti George","Deputy Executive Director","Dvara Research","Speaker","Fintech / Policy","Chennai","deepti@dvara.com","M","deeptigeorge","Non-","","Fintech Policy Expert","Head Strategy Dvara Research; rural financial inclusion expert",51,"C"],["126","Suresh Sethi","MD & CEO","NSDL Payments Bank","Speaker","Fintech / Banking","Mumbai","suresh@nsdlbank.com","M","sureshsethi","Gov","","Banking Leader","CEO NSDL Payments Bank; digital financial inclusion",51,"C"],["58","Michel Lucas","VP Sales APAC","OVHcloud","Exhibitor","Cloud Infrastructure","Bengaluru","michel.lucas@ovhcloud.com","M","michellucas","L","","Cloud Sales Leader","VP Sales APAC OVHcloud; sovereign cloud infrastructure",49,"C"],["86","Byju Raveendran","Founder & CEO","BYJU'S","Featured Founde","Edtech","Bengaluru","byju@byjus.com","L","byjuraveendran","Dist","$5.1B raised","Edtech Unicorn Founder","Founder BYJU'S; once world's most valuable edtech - now restructuring",48,"C"],["161","Sanjeev Kapoor","Celebrity Chef & Entrepreneu","SK Hospitality","Featured Founde","F&B / Hospitality","Mumbai","sanjeev@sanjeevkapoor.com","L","sanjeevkapoor","Priv","","F&B Brand Founder","Celebrity chef & food entrepreneur; 1B+ viewers globally",48,"C"],["138","Sneha Bhatt","Co-founder","DeepCall","Exhibitor / Fou","AI / Voice Tech","Bengaluru","sneha@deepcall.ai","M","snehabhatt","E","Undisclosed","AI Voice Startup Founder","Co-founder DeepCall; AI-powered call automation",46,"C"],["139","Ravi Honnapurmath","Co-founder","Zinterview.ai","Exhibitor / Fou","HR Tech / AI","Bengaluru","ravi@zinterview.ai","M","ravihonnapurmath","E","Undisclosed","HR Tech AI Founder","Co-founder Zinterview.ai; AI-powered interview platform",46,"C"],["140","Vivek Mohan","Co-founder","Trocco","Exhibitor / Fou","Data Integration / S","Bengaluru","vivek@trocco.io","M","vivekmohan","E","$3M","Data SaaS Founder","Co-founder Trocco; cloud-native data integration platform",46,"C"],["156","Suresh Venkat","VP Engineering","Freshworks","Speaker","SaaS / Engineering","Chennai","suresh.venkat@freshworks.com","M","sureshvenkat","L","$1B","SaaS Engineering Leader","VP Engineering Freshworks; platform and infra builder",46,"C"],["164","Priya Mohan","VP Talent","Flipkart","Speaker","HR / E-commerce","Bengaluru","priya.mohan@flipkart.com","M","priyamohan","L","","E-commerce HR Leader","VP Talent Flipkart; talent strategy for India's largest e-comm",46,"C"],["54","Shashi Kumar","Founder & CEO","Akshayakalpa","Exhibitor","Agritech / Dairy","Bengaluru","shashi@akshayakalpa.org","M","shashikumar","S","$10M","Agritech Founder","Founder Akshayakalpa; organic dairy to 100K households",44,"C"],["47","Beverly White","Anchor & Host","YourStory","Speaker","Media","Bengaluru","beverly@yourstory.com","M","beverlywhite","S","$25M","Media Host","YourStory Anchor; TechSparks 2024 stage host",41,"C"],["51","Tapan Singh","CEO","BookWater","Exhibitor","WaterTech / IoT","Chennai","tapan@bookwater.org","M","tapansingh","E","$2M","CleanTech Startup CEO","CEO BookWater; IoT-based water dispensing subscription startup",41,"C"],["52","Raju Senapati","Co-founder","KrispCall","Exhibitor","Cloud Communications","Bengaluru","raju@krispcall.com","M","rajusenapati","E","$5M","Cloud Comms Founder","Co-founder KrispCall; cloud phone system for businesses",41,"C"],["55","Ramprakash Ramamoorthy","CEO","Anydone","Exhibitor","AI / SaaS / Automati","Bengaluru","ramprakash@anydone.com","M","ramprakashramamoorthy","E","$3M","AI SaaS CEO","CEO Anydone; AI-powered work management platform",41,"C"],["90","Radhakrishna Shenoy","CEO","EvoluteIQ","Exhibitor","Digital Transformati","Bengaluru","rk.shenoy@evoluteiq.com","M","radhakrishnashenoy","E","$10M","AI Transformation CEO","CEO EvoluteIQ; enterprise AI and digital transformation",41,"C"],["1","Dr. Sreedhara Panicker Somanath","Chairman","ISRO","Speaker","Spacetech / Governme","Bengaluru","chairman@isro.gov.in","H","s-somanath","Gov","","Government Decision Maker","Keynote at TechSparks 2024; ISRO Spacetech collaborations",40,"C"],["39","Rajiv Khaitan","Senior Partner","Khaitan & Co","Speaker","Legal","Bengaluru","rajiv.khaitan@khaitanco.com","H","rajivkhaitan","Part","","Legal Advisor","Senior Partner Khaitan; top startup legal counsel in India",40,"C"],["129","Mohit Satyanand","Angel Investor & Chairperson","Self","Investor","Angel Investing","Delhi","mohit.satyanand@gmail.com","L","mohitsatyanand","E","","Angel Investor","Prominent Delhi-based angel investor; consumer & lifestyle",40,"C"],["53","Shyam Krishnamurthy","CEO","BlueAltair","Exhibitor","Consulting / Digital","Hyderabad","shyam@bluealtair.com","M","shyamkrishnamurthy","Priv","","Digital Consulting CEO","CEO BlueAltair; digital transformation consulting",39,"C"],["64","Hari TN","VP HR","BigBasket","Speaker","HR / Retail","Bengaluru","hari.tn@bigbasket.com","M","haritn","Acq","","HR Leader","VP HR BigBasket; talent strategy for India's largest e-grocery",39,"C"],["162","Dhruv Chopra","Managing Director India","BYJU's FutureSchool","Speaker","Edtech","Bengaluru","dhruv.chopra@byjusfutureschool.com","L","dhruvchopra","S","$30M","Edtech Business Leader","MD BYJU's FutureSchool; live 1:1 tutoring platform",37,"C"],["2","Shri Amitabh Kant","G20 Sherpa","Government of India","Speaker","Policy / Government","New Delhi","amitabh.kant@gov.in","M","amitabhkant","Gov","","Policy Influencer","G20 Sherpa; India's global tech positioning advocate",36,"C"],["40","Shivaarti Bajaj","Founding Managing Partner","RSD Bajaj Global Law Firm","Speaker","Legal","Delhi","shivaarti@rsdbajaj.com","M","shivaartibajaj","Part","","Legal Expert","Founding Partner RSD Bajaj; cross-border legal counsel",36,"C"],["41","Varun Bajaj","Founding Managing Partner","RSD Bajaj Global Law Firm","Speaker","Legal","Delhi","varun@rsdbajaj.com","M","varunbajaj","Part","","Legal Expert","Founding Partner RSD Bajaj; M&A and startup law",36,"C"],["46","Anil Agrawal","Member","Competition Commission of","Speaker","Policy / Regulation","New Delhi","anil.agrawal@cci.gov.in","M","anilagrawal","Gov","","Regulatory Decision Maker","CCI Member; antitrust & competition policy for startups",36,"C"],["141","Sathish Lakshmanan","Director","Deloitte Tohmatsu Venture","Speaker","Consulting / Global","Tokyo","sathish@deloitte.com","M","sathishlakshmanan","Part","","Consulting Director","Director Deloitte Japan; India-Japan startup ecosystem bridge",36,"C"],["175","Akhil Paul","Director Programs","iStart Rajasthan","Speaker","Government / Startup","Jaipur","akhil.paul@rajasthan.gov.in","M","akhilpaul","Gov","","Gov Ecosystem Leader","Director iStart Rajasthan; state-level startup ecosystem builder",36,"C"],["199","Harinder Takhar","CEO & Advisor","Paytm Canada / Independen","Featured Adviso","Fintech / Global","Toronto","harinder@harindersingh.com","L","harindertakhar","VC","","International Fintech Advisor","Ex-CEO Paytm Canada; SE Asia & global fintech expansion advisor",36,"C"],["45","Kiyoko Hashiba","Director Global Promotion","Tokyo Metropolitan Govern","Speaker","Government / Interna","Tokyo","kiyoko.hashiba@metro.tokyo.lg.jp","L","kiyokohashiba","Gov","","International Government Official","Tokyo Metro Govt; Japan-India tech collaboration",32,"C"],["121","S. Krishnan","Secretary","MeitY","Speaker","Policy / Government","New Delhi","secretary@meity.gov.in","L","skrishnanias","Gov","","Top Policy Official","Secretary MeitY; governs India's digital economy policy",32,"C"],["134","Doreswamy Nandkishore","Board Advisor & Former EVP","Nestl\u00e9","Speaker","FMCG / Board","Singapore","nandkishore.d@gmail.com","L","nandkishore","FMCG","Low","Board Advisor & Former EVP @ Nestl\u00e9","",27,"C"],["89","Anirudh Arun","Co-founder","Findy","Exhibitor","Fintech / Discovery","Bengaluru","anirudh@findy.in","M","anirudharun","E","Undisclosed","Fintech Startup Founder","Co-founder Findy; financial product discovery platform",26,"C"],["56","Hiroyuki Matsunaga","Director","JETRO India","Exhibitor","Trade / Internationa","Delhi","h-matsunaga@jetro.go.jp","L","hiroyukimatsunaga","Gov","","International Trade Official","JETRO India Director; Japan-India business exchange",20,"C"]];

// Convert arrays to objects
const CONTACTS = RAW.map(r => ({
  id:r[0], name:r[1], title:r[2], company:r[3], category:r[4],
  sector:r[5], city:r[6], email:r[7], ec:r[8], li:r[9],
  fs:r[10], lf:r[11], persona:r[12], hook:r[13], score:r[14], tier:r[15]
}));

const FS_LABELS = {L:"Listed/Public",LS:"Late Stage",VC:"VC Fund",G:"Growth",S:"Scale",E:"Early",Gov:"Gov",Acq:"Acquired",Boot:"Bootstrapped"};
const TIER_COLOR = {A:"#00e0a0", B:"#f5a623", C:"#6b7394"};
const TIER_LABEL = {A:"Tier A · AE+Exec", B:"Tier B · SDR", C:"Tier C · Nurture"};
const EC_COLOR = {H:"#00e0a0", M:"#f5a623", L:"#ef4444"};

async function genMessage(c, phase) {
  const prompts = {
    pre: "Write a LinkedIn connection request (max 3 sentences) for " + c.name + ", " + c.title + " at " + c.company + " (" + c.sector + "). Context: " + c.hook + ". Be specific to their work. End with: Once you find this relevant, I can introduce you to a YC-backed company specializing in solving this.",
    during: "Write a 2-sentence during-event opener + 1 genuine question for " + c.name + " (" + c.title + " at " + c.company + "). Context: " + c.hook + ". Sound like a peer, not a vendor.",
    post: "Write a post-event follow-up email for " + c.name + ", " + c.title + " at " + c.company + ". Context: " + c.hook + ". Line 1: Subject: [subject]. Blank line. 3-4 sentence body. Close: Once you find this relevant, I would be happy to introduce you to a YC-backed company solving exactly this. Sign: Warm regards, [Your Name]"
  };
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      model:"claude-sonnet-4-20250514",
      max_tokens:600,
      messages:[{role:"user", content:prompts[phase]}]
    })
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.content?.[0]?.text || "No response";
}

const PHASES = [
  {key:"pre",   icon:"📅", label:"Pre-Event LinkedIn"},
  {key:"during",icon:"🎯", label:"During Event"},
  {key:"post",  icon:"📬", label:"Post-Event Email"},
];

function Badge({color, children}) {
  return (
    <span style={{background:color+"18", color, border:"1px solid "+color+"35",
      borderRadius:4, padding:"2px 8px", fontSize:11, fontWeight:700, whiteSpace:"nowrap"}}>
      {children}
    </span>
  );
}

function ScoreBar({score, tier}) {
  const color = TIER_COLOR[tier];
  return (
    <div style={{display:"flex", alignItems:"center", gap:6}}>
      <div style={{width:60, height:5, borderRadius:3, background:"#1a1e2e"}}>
        <div style={{width:score+"%", height:"100%", borderRadius:3, background:color}}/>
      </div>
      <span style={{fontFamily:"monospace", fontSize:12, fontWeight:800, color}}>{score}</span>
    </div>
  );
}

function ContactRow({c, open, onToggle, msgs, loading, onGenerate}) {
  const tc = TIER_COLOR[c.tier];
  const initials = c.name.split(" ").map(w=>w[0]).slice(0,2).join("");
  return (
    <div style={{borderBottom:"1px solid #111525"}}>
      <div onClick={onToggle} style={{
        display:"flex", alignItems:"center", padding:"11px 18px",
        cursor:"pointer", gap:12, flexWrap:"wrap",
        background:open?"#0d1020":"transparent", transition:"background 0.15s"
      }}>
        <div style={{width:30, height:30, borderRadius:7, background:"#141828", display:"flex",
          alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800,
          color:"#4a6cf7", flexShrink:0, fontFamily:"monospace"}}>
          {initials}
        </div>
        <div style={{flex:1, minWidth:160}}>
          <div style={{fontWeight:700, fontSize:13, color:"#dde2f5"}}>{c.name}</div>
          <div style={{fontSize:11, color:"#404878", marginTop:1}}>{c.title} · <span style={{color:"#3d56f0"}}>{c.company}</span></div>
        </div>
        <div style={{display:"flex", alignItems:"center", gap:7, flexShrink:0, flexWrap:"wrap"}}>
          <ScoreBar score={c.score} tier={c.tier}/>
          <Badge color={tc}>{TIER_LABEL[c.tier]}</Badge>
          <Badge color={EC_COLOR[c.ec]}>{c.ec==="H"?"High conf":c.ec==="M"?"Med conf":"Low conf"}</Badge>
          <Badge color="#4a6cf7">{FS_LABELS[c.fs]||c.fs}</Badge>
          <span style={{color:open?"#4a6cf7":"#303458", fontSize:14,
            transform:open?"rotate(180deg)":"none", display:"inline-block", transition:"transform 0.2s"}}>▾</span>
        </div>
      </div>

      {open && (
        <div style={{padding:"14px 18px 20px", background:"#090c18", borderTop:"1px solid #111525"}}>
          <div style={{background:"#0e1228", border:"1px solid #1a2040",
            borderRadius:8, padding:"10px 14px", marginBottom:12}}>
            <div style={{fontSize:10, fontWeight:800, color:"#4a6cf7",
              letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:4}}>💡 Personalization Hook</div>
            <div style={{fontSize:12, color:"#8891c0", lineHeight:1.55}}>{c.hook}</div>
            <div style={{fontSize:11, color:"#303458", marginTop:3}}>
              Persona: <span style={{color:"#505888"}}>{c.persona}</span>
            </div>
          </div>

          <div style={{display:"flex", gap:7, flexWrap:"wrap", marginBottom:12}}>
            {PHASES.map(p => (
              <button key={p.key} onClick={()=>onGenerate(c,p.key)}
                disabled={loading===p.key}
                style={{background:msgs[p.key]?"#162040":"#111828",
                  border:"1px solid "+(msgs[p.key]?"#3d56f055":"#1a2040"),
                  color:loading===p.key?"#303458":"#9baad8",
                  borderRadius:7, padding:"7px 14px", cursor:loading===p.key?"wait":"pointer",
                  fontSize:12, fontWeight:600, display:"flex", alignItems:"center", gap:5}}>
                {loading===p.key ? "⟳" : p.icon}
                {loading===p.key ? "Generating…" : (msgs[p.key]?"✓ ":"")+p.label}
              </button>
            ))}
          </div>

          {PHASES.map(p => msgs[p.key] && (
            <div key={p.key} style={{background:"#070914", border:"1px solid #111828",
              borderRadius:9, padding:"13px 16px", marginBottom:9}}>
              <div style={{fontSize:10, fontWeight:800, color:"#4a6cf7",
                letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8}}>
                {p.icon} {p.label}
              </div>
              <pre style={{margin:0, fontSize:12.5, lineHeight:1.7, color:"#b0bde8",
                whiteSpace:"pre-wrap", fontFamily:"monospace"}}>{msgs[p.key]}</pre>
              <button onClick={()=>navigator.clipboard.writeText(msgs[p.key])}
                style={{marginTop:9, background:"transparent", border:"1px solid #1a2040",
                  color:"#303458", borderRadius:5, padding:"3px 11px", fontSize:11, cursor:"pointer"}}>
                Copy
              </button>
            </div>
          ))}

          <div style={{display:"flex", gap:14, marginTop:9, flexWrap:"wrap",
            paddingTop:9, borderTop:"1px solid #111525"}}>
            <span style={{fontSize:11, color:"#282e50"}}>📧 {c.email}</span>
            <a href={"https://linkedin.com/in/"+c.li} target="_blank" rel="noopener noreferrer"
              style={{fontSize:11, color:"#4a6cf7", textDecoration:"none"}}>🔗 LinkedIn</a>
            {c.city && <span style={{fontSize:11, color:"#282e50"}}>📍 {c.city}</span>}
            {c.lf && <span style={{fontSize:11, color:"#282e50"}}>💰 {c.lf}</span>}
          </div>
        </div>
      )}
    </div>
  );
}

function Stats() {
  const counts = {A:0,B:0,C:0};
  const sectors = {};
  CONTACTS.forEach(c => {
    counts[c.tier]++;
    sectors[c.sector] = (sectors[c.sector]||0)+1;
  });
  const topSec = Object.entries(sectors).sort((a,b)=>b[1]-a[1]).slice(0,7);
  return (
    <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:10, marginBottom:18}}>
      {[
        {l:"Total Contacts", v:200, c:"#4a6cf7"},
        {l:"Tier A — Priority", v:counts.A, c:"#00e0a0", sub:"AE + Exec route"},
        {l:"Tier B — SDR", v:counts.B, c:"#f5a623", sub:"3-touch sequence"},
        {l:"Tier C — Nurture", v:counts.C, c:"#6b7394", sub:"Monthly drip"},
      ].map(s=>(
        <div key={s.l} style={{background:"#0c0f1c", border:"1px solid "+s.c+"20",
          borderRadius:9, padding:"13px 16px"}}>
          <div style={{fontSize:10, color:"#303458", fontWeight:700,
            textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:5}}>{s.l}</div>
          <div style={{fontSize:26, fontWeight:800, color:s.c, fontFamily:"monospace", lineHeight:1}}>{s.v}</div>
          {s.sub && <div style={{fontSize:10, color:"#303458", marginTop:3}}>{s.sub}</div>}
        </div>
      ))}
      <div style={{background:"#0c0f1c", border:"1px solid #1a2040",
        borderRadius:9, padding:"13px 16px", gridColumn:"span 2"}}>
        <div style={{fontSize:10, color:"#303458", fontWeight:700,
          textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:8}}>Top Sectors</div>
        <div style={{display:"flex", flexWrap:"wrap", gap:5}}>
          {topSec.map(([s,n])=>(
            <span key={s} style={{background:"#131828", border:"1px solid #1a2040",
              color:"#6070a8", borderRadius:5, padding:"3px 9px", fontSize:11}}>
              {s} <span style={{color:"#4a6cf7", fontWeight:700}}>{n}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [openId, setOpenId] = useState(null);
  const [msgs, setMsgs] = useState({});
  const [loadMap, setLoadMap] = useState({});
  const [search, setSearch] = useState("");
  const [tierF, setTierF] = useState("ALL");
  const [sectorF, setSectorF] = useState("ALL");
  const [tab, setTab] = useState("contacts");

  const sectors = useMemo(()=>["ALL",...Array.from(new Set(CONTACTS.map(c=>c.sector))).sort()],[]);
  const filtered = useMemo(()=>CONTACTS.filter(c=>{
    if (tierF!=="ALL" && c.tier!==tierF) return false;
    if (sectorF!=="ALL" && c.sector!==sectorF) return false;
    const q=search.toLowerCase();
    return !q||c.name.toLowerCase().includes(q)||c.company.toLowerCase().includes(q)||c.hook.toLowerCase().includes(q)||c.persona.toLowerCase().includes(q);
  }),[search,tierF,sectorF]);

  async function handleGen(c, phase) {
    const key = c.id+"__"+phase;
    setLoadMap(p=>({...p,[c.id]:phase}));
    try {
      const m = await genMessage(c, phase);
      setMsgs(p=>({...p,[key]:m}));
    } catch(e) {
      setMsgs(p=>({...p,[key]:"Error: "+e.message}));
    }
    setLoadMap(p=>({...p,[c.id]:null}));
  }

  const tierCounts = {A:0,B:0,C:0};
  CONTACTS.forEach(c=>tierCounts[c.tier]++);

  return (
    <div style={{minHeight:"100vh", background:"#07090f", color:"#dde2f5",
      fontFamily:"system-ui,-apple-system,sans-serif"}}>

      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#090c18,#0b0f20)",
        borderBottom:"1px solid #111525", padding:"16px 24px"}}>
        <div style={{maxWidth:1100, margin:"0 auto", display:"flex",
          justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10}}>
          <div>
            <div style={{fontSize:18, fontWeight:800, letterSpacing:"-0.02em", color:"#fff"}}>
              ⚡ TechSparks 2024 — GTM Outreach
            </div>
            <div style={{fontSize:11, color:"#282e50", marginTop:2}}>
              200 real contacts · AI-personalized outreach · Claude-powered
            </div>
          </div>
          <div style={{display:"flex", gap:7, flexWrap:"wrap"}}>
            {[
              {l:tierCounts.A+" Tier A", c:"#00e0a0"},
              {l:tierCounts.B+" Tier B", c:"#f5a623"},
              {l:tierCounts.C+" Tier C", c:"#6b7394"},
              {l:"200 Contacts", c:"#4a6cf7"},
            ].map(s=>(
              <div key={s.l} style={{background:s.c+"14", border:"1px solid "+s.c+"28",
                color:s.c, borderRadius:7, padding:"5px 12px", fontSize:12, fontWeight:700}}>{s.l}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{borderBottom:"1px solid #111525", padding:"0 24px"}}>
        <div style={{maxWidth:1100, margin:"0 auto", display:"flex"}}>
          {[
            {k:"contacts",l:"📋 Contacts"},
            {k:"workflow",l:"⚙️ Workflow"},
            {k:"guide",l:"🚀 Setup Guide"},
          ].map(t=>(
            <button key={t.k} onClick={()=>setTab(t.k)} style={{
              background:"transparent", border:"none",
              borderBottom:tab===t.k?"2px solid #4a6cf7":"2px solid transparent",
              color:tab===t.k?"#fff":"#282e50",
              padding:"13px 18px", cursor:"pointer", fontSize:13, fontWeight:600
            }}>{t.l}</button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:1100, margin:"0 auto", padding:"20px 24px"}}>

        {/* CONTACTS */}
        {tab==="contacts" && (
          <>
            <Stats/>
            <div style={{display:"flex", gap:7, marginBottom:14, flexWrap:"wrap"}}>
              <input placeholder="Search name, company, hook, persona…"
                value={search} onChange={e=>setSearch(e.target.value)}
                style={{flex:1, minWidth:200, background:"#0c0f1c", border:"1px solid #1a2040",
                  color:"#dde2f5", borderRadius:7, padding:"8px 12px", fontSize:13, outline:"none"}}/>
              {["ALL","A","B","C"].map(t=>(
                <button key={t} onClick={()=>setTierF(t)} style={{
                  background:tierF===t?"#141828":"transparent",
                  border:"1px solid "+(tierF===t?"#4a6cf7":"#141828"),
                  color:tierF===t?"#fff":"#282e50",
                  borderRadius:7, padding:"8px 13px", cursor:"pointer", fontSize:12, fontWeight:600}}>
                  {t==="ALL"?"All Tiers":"Tier "+t}
                </button>
              ))}
              <select value={sectorF} onChange={e=>setSectorF(e.target.value)}
                style={{background:"#0c0f1c", border:"1px solid #1a2040", color:"#6070a8",
                  borderRadius:7, padding:"8px 11px", fontSize:12, cursor:"pointer", outline:"none"}}>
                {sectors.map(s=><option key={s} value={s}>{s==="ALL"?"All Sectors":s}</option>)}
              </select>
            </div>
            <div style={{fontSize:11, color:"#282e50", marginBottom:9}}>
              Showing {filtered.length} of 200 · Click any row to generate AI outreach messages
            </div>
            <div style={{background:"#090c18", border:"1px solid #111525", borderRadius:11, overflow:"hidden"}}>
              <div style={{display:"flex", padding:"8px 18px", borderBottom:"1px solid #111525",
                background:"#070914", gap:12}}>
                {["Contact","ICP · Tier","Email Conf.","Funding"].map(h=>(
                  <div key={h} style={{flex:h==="Contact"?1:0, minWidth:h==="Contact"?"auto":"120px",
                    fontSize:10, fontWeight:700, color:"#282e50",
                    letterSpacing:"0.08em", textTransform:"uppercase"}}>{h}</div>
                ))}
              </div>
              {filtered.length===0 && (
                <div style={{padding:32, textAlign:"center", color:"#282e50", fontSize:13}}>
                  No contacts match filters.
                </div>
              )}
              {filtered.map(c=>(
                <ContactRow key={c.id} c={c}
                  open={openId===c.id}
                  onToggle={()=>setOpenId(openId===c.id?null:c.id)}
                  msgs={{
                    pre:  msgs[c.id+"__pre"],
                    during: msgs[c.id+"__during"],
                    post: msgs[c.id+"__post"]
                  }}
                  loading={loadMap[c.id]}
                  onGenerate={handleGen}/>
              ))}
            </div>
          </>
        )}

        {/* WORKFLOW */}
        {tab==="workflow" && (
          <div>
            <div style={{fontWeight:800, fontSize:17, marginBottom:5, color:"#fff"}}>
              Full GTM Automation Pipeline
            </div>
            <div style={{fontSize:13, color:"#303458", marginBottom:20, lineHeight:1.6}}>
              From TechSparks 2024 attendee list to personalized multi-channel outreach.
            </div>
            {[
              {icon:"📋", title:"TechSparks2024_Enriched_Outreach_List.csv", c:"#4a6cf7",
                desc:"200 real contacts with Name, Title, Company, Sector, Funding Stage, Personalization Hook and GTM Persona already built in."},
              {icon:"🎯", title:"ICP Scoring", c:"#818cf8",
                desc:"Score 0-100: Outreach Priority field (40/25/10 pts) + Category type (Founder/Investor/Speaker) + Funding stage maturity + Email confidence + Hook quality. Tiers: A>=80, B>=55, C<55."},
              {icon:"🔀", title:"Lead Routing", c:"#38bdf8",
                desc:"Tier A (101) → AE + Senior Exec within 24hrs + Slack alert. Tier B (65) → SDR 3-touch email Day 1/3/7. Tier C (34) → Monthly newsletter nurture."},
              {icon:"🤖", title:"Claude AI — Message Generation", c:"#00e0a0",
                desc:"Per contact per phase: uses their real Personalization Hook as context. Pre-event LinkedIn note (3 sentences). During-event opener (peer tone). Post-event email (subject + body + YC intro offer)."},
              {icon:"⚙️", title:"n8n Daily Automation", c:"#f5a623",
                desc:"Daily trigger → Read Google Sheet → Score & route → Claude API call → Write to Enriched sheet → Mark row done → Slack alert for Tier A."},
              {icon:"📣", title:"Multi-Channel Outreach", c:"#ef4444",
                desc:"Email: copy from this tool, send via Gmail/Brevo. LinkedIn: copy note, paste manually (protects account from bans). Tier A: forwarded to AE + leadership."},
            ].map((s,i)=>(
              <div key={i} style={{display:"flex", gap:0, marginBottom:4}}>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:38}}>
                  <div style={{width:28, height:28, borderRadius:7, background:s.c+"20",
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:14}}>{s.icon}</div>
                  {i<5 && <div style={{width:2, flex:1, background:"#111525", minHeight:12, margin:"2px 0"}}/>}
                </div>
                <div style={{flex:1, background:"#0c0f1c", border:"1px solid "+s.c+"20",
                  borderRadius:9, padding:"11px 15px", marginBottom:3, marginLeft:7}}>
                  <div style={{fontSize:11, fontWeight:800, color:s.c,
                    letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:3}}>{s.title}</div>
                  <div style={{fontSize:12, color:"#303458", lineHeight:1.55}}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* GUIDE */}
        {tab==="guide" && (
          <div>
            <div style={{fontWeight:800, fontSize:17, marginBottom:5, color:"#fff"}}>
              Step-by-Step Setup Guide
            </div>
            <div style={{fontSize:13, color:"#303458", marginBottom:20, lineHeight:1.6}}>
              Complete guide from zero to working model. No coding required.
            </div>
            {[
              {s:"01", title:"Create a GitHub Account", c:"#4a6cf7",
                items:["Go to github.com and click Sign Up","Enter username, email, password and verify your email","Done — you now have a GitHub account"]},
              {s:"02", title:"Create a New Repository", c:"#818cf8",
                items:["Log in to GitHub, click the green New button (top left)","Name it: techsparks-gtm-2024, set to Public","Click Create repository"]},
              {s:"03", title:"Upload Your Files to GitHub", c:"#38bdf8",
                items:["Download TechSparks_GTM_2024.jsx, README.md, and contacts_scored_2024.json from this chat","On your new repo page click uploading an existing file","Drag all 3 files in, type Initial commit, click Commit changes"]},
              {s:"04", title:"Get a Free Claude API Key", c:"#00e0a0",
                items:["Go to console.anthropic.com and sign up free","Click API Keys in the left menu, then Create Key","Copy the key starting with sk-ant- and keep it safe"]},
              {s:"05", title:"Set Up Google Sheets as Database", c:"#f5a623",
                items:["Go to sheets.google.com and create a new spreadsheet","Tab 1 named Raw: import your TechSparks2024_Enriched_Outreach_List.csv","Tab 2 named Enriched: n8n will write scored output here","Copy the Sheet ID from the URL bar (long string between /d/ and /edit)"]},
              {s:"06", title:"Set Up n8n Free Cloud Workflow", c:"#ef4444",
                items:["Go to n8n.io, click Get started free, sign up with Google","Click New Workflow, then the menu icon, then Import from JSON","Connect Google Sheets nodes by clicking Create credential and signing in","In the Claude HTTP Request node, add header: x-api-key = your Claude key","Replace YOUR_SHEET_ID in all Google Sheets nodes with your actual ID","Click Save then toggle Activate — runs daily at 9am"]},
              {s:"07", title:"Use This App for Daily Outreach", c:"#6b7394",
                items:["This prototype runs right here in Claude — no install needed","Filter to Tier A first — these are your top 101 priority contacts","Click any contact row, then click Pre-Event / During Event / Post-Event","Copy the generated message and paste into LinkedIn or Gmail","Tier A contacts: forward to your AE or senior exec to send personally"]},
            ].map((s,i)=>(
              <div key={i} style={{background:"#0c0f1c", border:"1px solid "+s.c+"18",
                borderRadius:11, padding:"16px 18px", marginBottom:9}}>
                <div style={{display:"flex", alignItems:"center", gap:9, marginBottom:11}}>
                  <span style={{fontFamily:"monospace", fontSize:11, fontWeight:800, color:s.c,
                    background:s.c+"18", border:"1px solid "+s.c+"30",
                    borderRadius:5, padding:"2px 9px"}}>STEP {s.s}</span>
                  <span style={{fontWeight:700, fontSize:14, color:"#dde2f5"}}>{s.title}</span>
                </div>
                {s.items.map((item,j)=>(
                  <div key={j} style={{display:"flex", gap:9, marginBottom:6}}>
                    <span style={{color:s.c, fontSize:12, flexShrink:0}}>{j+1}.</span>
                    <span style={{fontSize:13, color:"#3a4a78", lineHeight:1.5}}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
