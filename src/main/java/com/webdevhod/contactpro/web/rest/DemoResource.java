package com.webdevhod.contactpro.web.rest;

import com.webdevhod.contactpro.domain.Authority;
import com.webdevhod.contactpro.domain.Category;
import com.webdevhod.contactpro.domain.Contact;
import com.webdevhod.contactpro.domain.User;
import com.webdevhod.contactpro.domain.enumeration.States;
import com.webdevhod.contactpro.repository.AuthorityRepository;
import com.webdevhod.contactpro.repository.UserRepository;
import com.webdevhod.contactpro.security.AuthoritiesConstants;
import com.webdevhod.contactpro.security.SecurityUtils;
import com.webdevhod.contactpro.security.jwt.JWTFilter;
import com.webdevhod.contactpro.security.jwt.TokenProvider;
import com.webdevhod.contactpro.service.CategoryService;
import com.webdevhod.contactpro.service.ContactService;
import com.webdevhod.contactpro.service.UserService;
import java.io.File;
import java.nio.file.Files;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.*;
import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/api")
public class DemoResource {

    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final PasswordEncoder passwordEncoder;
    private final Logger log = LoggerFactory.getLogger(DemoResource.class);
    private final UserRepository userRepository;
    private final UserService userService;
    private final AuthorityRepository authorityRepository;
    private final CategoryService categoryService;
    private final ContactService contactService;

    public DemoResource(
        TokenProvider tokenProvider,
        AuthenticationManagerBuilder authenticationManagerBuilder,
        PasswordEncoder passwordEncoder,
        UserRepository userRepository,
        UserService userService,
        AuthorityRepository authorityRepository,
        CategoryService categoryService,
        ContactService contactService
    ) {
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.userService = userService;
        this.authorityRepository = authorityRepository;
        this.categoryService = categoryService;
        this.contactService = contactService;
    }

    @PostMapping("/demo")
    public ResponseEntity<UserJWTController.JWTToken> demo() throws Exception {
        System.out.println("/createDemo");

        String lastName = (new RandomStringUtils()).random(5, true, true).toUpperCase();
        String loginName = "guest" + lastName;

        String password = "password";
        String encryptedPassword = passwordEncoder.encode(password);

        User user = new User();
        user.setEmail(loginName + "@mail.com");
        user.setPassword(encryptedPassword);
        user.setFirstName("Guest");
        user.setLastName(lastName);
        user.setLogin(loginName);
        user.setActivated(true);
        user.setLangKey("en");

        Set<Authority> authorities = new HashSet<>();

        authorityRepository.findById(AuthoritiesConstants.GUEST).ifPresent(authorities::add);
        user.setAuthorities(authorities);
        user = userRepository.save(user);

        log.debug("Created Information for User: {}", user);

        // adding category data
        String[] categoryNames = new String[] { "Friends", "Family", "Co-workers" };
        List<Category> savedCategories = new ArrayList<>();

        for (String categoryName : categoryNames) {
            Category category = new Category();
            category.setName(categoryName);
            category.setAppUser(user);
            category.setCreated(ZonedDateTime.now(ZoneOffset.UTC));
            category = categoryService.save(category);
            savedCategories.add(category);
            log.debug("Created Information for Category: {}", category);
        }

        List<Contact> contacts = generateUnsavedContacts(user);
        Collections.shuffle(savedCategories);

        for (int i = 0; i < contacts.size(); ++i) {
            Contact contact = contacts.get(i);
            contact = contactService.save(contact);
            log.debug("Created Information for Contact: {}", contact);

            int index = i % savedCategories.size();
            Category category = savedCategories.get(index);
            category = categoryService.update(category.addContact(contact));
            savedCategories.set(index, category);
            log.debug("Update Information for Category: {}", category);
        }

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user.getLogin(), password);

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.createToken(authentication, false);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JWTFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        System.out.println("SecurityUtils.isAuthenticated()");
        System.out.println(SecurityUtils.isAuthenticated());

        return new ResponseEntity<>(new UserJWTController.JWTToken(jwt), httpHeaders, HttpStatus.OK);
    }

    private class Address {

        String address;
        String city;
        States state;
        String zipCode;
        String phoneNumber;

        public Address(String address, String city, States state, String zipCode, String phoneNumber) {
            this.address = address;
            this.city = city;
            this.state = state;
            this.zipCode = zipCode;
            this.phoneNumber = phoneNumber;
        }
    }

    private class Person {

        String firstName;
        String lastName;
        String imagePath;

        public Person(String firstName, String lastName, String imagePath) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.imagePath = imagePath;
        }
    }

    private List<Contact> generateUnsavedContacts(User user) throws Exception {
        List<Contact> contactList = new ArrayList<>();
        ZonedDateTime now = ZonedDateTime.now(ZoneOffset.UTC);

        List<Address> addressList = Arrays.asList(
            new Address("103 Meridith Dr", "Aberdeen", States.NC, "28315", "(910) 944-9646"),
            new Address("1628 S Bayless St", "Anaheim", States.CA, "92802", "(714) 635-4835"),
            new Address("3810 Marion Marysville Rd", "Prospect", States.OH, "43342", "(740) 751-4129"),
            new Address("4091 Country Ln NW", "Bremerton", States.WA, "98312", "(360) 479-4063"),
            new Address("928 Greenwood Ave #I", "Monroe", States.MI, "48162", "(734) 240-4802"),
            new Address("1415 22nd St", "Columbus", States.IN, "47201", "(812) 372-1606"),
            new Address("633 Heather Stone Dr", "Merritt Island", States.FL, "32953", "(321) 452-8617"),
            new Address("159 Asbury Hts SE", "Crawfordville", States.GA, "30631", "(706) 456-2475"),
            new Address("6515 N Harrison St", "Davenport", States.IA, "52806", "(563) 424-5793"),
            new Address("260 Camel Bend Ct", "Schaumburg", States.IL, "60194", "(847) 798-9253")
        );

        List<Person> personList = Arrays.asList(
            new Person("Claudia", "Black", "src/main/webapp/content/img/ClaudiaBlack.png"),
            new Person("Courtenay", "Taylor", "src/main/webapp/content/img/CourtenayTaylor.png"),
            new Person("Frank", "Langella", "src/main/webapp/content/img/FrankLangella.png"),
            new Person("Gina", "Torres", "src/main/webapp/content/img/GinaTorres.png"),
            new Person("Lance", "Reddick", "src/main/webapp/content/img/LanceReddick.png"),
            new Person("Moira", "Quirk", "src/main/webapp/content/img/MoiraQuirk.png"),
            new Person("Nathan", "Fillion", "src/main/webapp/content/img/NathanFillion.png"),
            new Person("Neil", "Kaplan", "src/main/webapp/content/img/NeilKaplan.png"),
            new Person("Nolan", "North", "src/main/webapp/content/img/NolanNorth.png"),
            new Person("Page", "Leong", "src/main/webapp/content/img/PageLeong.png")
        );

        List<String> birthdayList = Arrays.asList(
            "1996-10-19",
            "1997-09-25",
            "1986-09-10",
            "1989-04-09",
            "1986-10-30",
            "1991-08-06",
            "1994-04-12",
            "1983-03-16",
            "1986-11-22",
            "1987-05-16"
        );

        List<String> emailList = Arrays.asList(
            "geeber@gmail.com",
            "ranvm@optonline.net",
            "murdocj@verizon.net",
            "teverett@sbcglobal.net",
            "kildjean@sbcglobal.net",
            "birddog@verizon.net",
            "noodles@optonline.net",
            "debest@optonline.net",
            "aardo@att.net",
            "smone@optonline.net"
        );

        Collections.shuffle(personList);
        Collections.shuffle(addressList);
        Collections.shuffle(birthdayList);
        Collections.shuffle(emailList);

        for (int i = 0; i < personList.size(); ++i) {
            Person person = personList.get(i);
            Address address = addressList.get(i);
            String birthday = birthdayList.get(i);
            String email = emailList.get(i);

            Contact contact = new Contact();

            contact.setAppUser(user);
            contact.setFirstName(person.firstName);
            contact.setLastName(person.lastName);
            contact.setAddress1(address.address);
            contact.setCity(address.city);
            contact.setState(address.state);
            contact.setZipCode(address.zipCode);
            contact.setPhoneNumber(address.phoneNumber);
            contact.setEmail(email);
            contact.setCreated(now);
            contact.setUpdated(now);
            contact.setBirthDate(LocalDate.parse(birthday));

            File file = new File(person.imagePath);
            byte[] imageArray = Files.readAllBytes(file.toPath());
            contact.setImage(imageArray);
            contact.setImageContentType(Files.probeContentType(file.toPath()));

            contactList.add(contact);
        }

        Collections.shuffle(contactList);

        return contactList;
    }
}
