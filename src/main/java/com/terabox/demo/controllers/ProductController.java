package com.terabox.demo.controllers;

import com.terabox.demo.dtos.SearchDto;
import com.terabox.demo.entities.ProductEntity;
import com.terabox.demo.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Param;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "product")
@RequiredArgsConstructor
public class ProductController extends AbstractGeneralController{
    private final ProductService productService;
    @GetMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String getSearch(@RequestParam(value = "page", required = false, defaultValue = "1") int page,
                            SearchDto searchDto){
        searchDto.setRequestPage(page);
        ProductEntity[] products = this.productService.getProducts(searchDto);
        return this.parseResponse(searchDto, products, "products").toString();

//        일반적인 코드
//        JSONObject responseObject = new JSONObject();
//        responseObject.put("search", searchDto);
//        responseObject.put("products", products);
//        if (products == null){
//            responseObject.put("result", CommonResult.FAILURE.name().toLowerCase());
//        } else {
//            responseObject.put("result", CommonResult.SUCCESS.name().toLowerCase());
//        }
//        return responseObject.toString();
    }

    @GetMapping(value = "/image")
    @ResponseBody
    public ResponseEntity<byte[]> getImage(@RequestParam(value = "index", required = false, defaultValue = "0") int index){
        ProductEntity product = this.productService.getProduct(index);
        byte[] thumbnail = product.getThumbnail();
        if (thumbnail == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
                .contentLength(thumbnail.length)
                .contentType(MediaType.parseMediaType(product.getThumbnailContentType()))
                .body(thumbnail);
    }

    @GetMapping(value = "product", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ProductEntity getProduct(@Param("index") int index){
        return this.productService.getProduct(index);
    }
}
