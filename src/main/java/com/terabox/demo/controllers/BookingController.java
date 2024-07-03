package com.terabox.demo.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.terabox.demo.dtos.MovieOrderDto;
import com.terabox.demo.dtos.RegionCountDto;
import com.terabox.demo.dtos.ScreeningInfoDto;
import com.terabox.demo.entities.*;
import com.terabox.demo.services.BookingService;
import com.terabox.demo.services.CardService;
import com.terabox.demo.services.ScreeningInfoService;
import com.terabox.demo.services.SeatPriceService;
import com.terabox.demo.vos.ScreeningInfoVo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
@RequestMapping(value = "booking")
@RequiredArgsConstructor
public class BookingController {
    private final CardService cardService;
    private final ScreeningInfoService screeningInfoService;
    private final SeatPriceService seatPriceService;
    private final BookingService bookingService;

    @GetMapping(value = "/", produces = MediaType.TEXT_HTML_VALUE)
    public String getBooking(HttpSession session, HttpServletRequest request, RedirectAttributes redirectAttributes) {
        if (session.getAttribute("user") == null) {
            redirectAttributes.addFlashAttribute("alertMessage", "예매를 진행하기 위해서는 로그인이 필요합니다.");
            return "redirect:/home";
        }
        return "booking/booking";
    }


    @PostMapping(value = "/all-movies", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<MovieEntity> getAllMovies(@SessionAttribute(value = "user", required = false) UserEntity user) {
        if (user != null) {
            System.out.println("User found in session: " + user);
            System.out.println(user);// 콘솔 로그 추가
            if (user.getBirth() != null) {
                int userAge = Period.between(user.getBirth(), LocalDate.now()).getYears();
                System.out.println("User age: " + userAge); // 콘솔 로그 추가
                return bookingService.getAllMovies(userAge);
            } else {
                System.out.println("User birth date is null: " + user.getBirth()); // 콘솔 로그 추가
            }
        } else {
            System.out.println("User is not logged in"); // 콘솔 로그 추가
        }
        return bookingService.getAllMovies(null);
    }

    @PostMapping(value = "/theaters/count-by-region", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<RegionCountDto> getTheaterCountsByRegion() {
        return bookingService.getTheaterCountsByRegion();
    }

    @PostMapping(value = "/theaters/by-region", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<TheaterEntity> getTheatersByRegion(@RequestParam("region") String region) {
        return bookingService.getTheatersByRegion(region);
    }

    @PostMapping(value = "/screening-info-by-theater-and-movie", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<ScreeningInfoDto> getScreeningInfoByTheaterAndMovie(
            @RequestParam("theaterIndexes") List<Integer> theaterIndexes,
            @RequestParam("movieIndexes") List<Integer> movieIndexes,
            @RequestParam("screeningDate") String date,
            @SessionAttribute(value = "user", required = false) UserEntity user) {
        if (user == null) {
            return new ArrayList<>();
        }
        return bookingService.getScreeningInfoByTheaterAndMovie(theaterIndexes, movieIndexes, date);
    }

    @PostMapping(value = "/orderTwo", produces = MediaType.TEXT_HTML_VALUE)
    public String postOrderTwo(@ModelAttribute ScreeningInfoDto screeningInfoDto, RedirectAttributes redirectAttributes) {
        redirectAttributes.addFlashAttribute("screeningInfo", screeningInfoDto);
        return "redirect:/booking/orderTwo";
    }

    @GetMapping(value = "/seats", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<SeatEntity> getSeatsByScreeningInfo(@RequestParam("screeningInfoIndex") int screeningInfoIndex) {
        return bookingService.getSeatsByScreeningInfo(screeningInfoIndex);
    }

    @GetMapping(value = "/seat-prices", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<SeatPriceEntity> getSeatPrices() {
        return bookingService.getSeatPrices();
    }

    @PostMapping(value = "/orderThree", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE, produces = MediaType.TEXT_HTML_VALUE)
    public String postOrderThree(@RequestParam("movieOrderDto") String movieOrderDtoJson, Model model) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            MovieOrderDto movieOrderDto = objectMapper.readValue(movieOrderDtoJson, MovieOrderDto.class);

            // 디버깅 로그 추가
            System.out.println("Received MovieOrderDto: " + movieOrderDto);

            model.addAttribute("movieOrderDto", movieOrderDto);
            model.addAttribute("seatIndexes", Arrays.toString(movieOrderDto.getSeatIndexes())); // 배열을 문자열로 변환하여 추가
            return "booking/orderThree";
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "redirect:/booking/orderTwo"; // 에러 발생 시 orderTwo로 리디렉션
        }
    }

//    여기 어차피 없애고 나중에 xhr로 만들게 해야됨
    @GetMapping(value = "orderThree", produces = MediaType.TEXT_HTML_VALUE)
    public String getOrderThree(
            MovieOrderDto movieOrderDto,
            Model model){
        movieOrderDto.setAdultCount(2);
        movieOrderDto.setTeenagerCount(3);
        movieOrderDto.setOldCount(1);
        movieOrderDto.setDisabledCount(1);
        SeatPriceEntity[] seatPrices = this.seatPriceService.getSeatPrices();
        for (SeatPriceEntity seatPrice : seatPrices) {
            switch (seatPrice.getType()) {
                case "adult":
                    model.addAttribute("adultPrice", Math.max(seatPrice.getPrice(), 0));
                    break;
                case "teenager":
                    model.addAttribute("teenagerPrice", Math.max(seatPrice.getPrice(), 0));
                    break;
                case "old":
                    model.addAttribute("oldPrice", Math.max(seatPrice.getPrice(), 0));
                    break;
                case "disabled":
                    model.addAttribute("disabledPrice", Math.max(seatPrice.getPrice(), 0));
                    break;
                default:
            }
        }
        model.addAttribute("movieOrderDto", movieOrderDto);
        ScreeningInfoVo screeningInfoVo = this.screeningInfoService.getScreeningInfoVos(movieOrderDto.getScreeningInfoIndex());
        model.addAttribute("screeningInfoVo", screeningInfoVo);
        CardEntity[] cards = this.cardService.getCards();
        model.addAttribute("cards", cards);
        return "booking/orderThree";
    }

    @GetMapping(value = "orderTwo", produces = MediaType.TEXT_HTML_VALUE)
    public String getOrderTwo(){
        return "booking/orderTwo";
    }
}