package com.terabox.demo.services;

import com.terabox.demo.dtos.SearchDto;
import com.terabox.demo.dtos.StoreOrderDto;
import com.terabox.demo.entities.CardEntity;
import com.terabox.demo.entities.ProductEntity;
import com.terabox.demo.mappers.CardMapper;
import com.terabox.demo.mappers.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductMapper productMapper;
    private final CardMapper cardMapper;
    public ProductEntity getProduct(int index){
        return this.productMapper.selectProductByIndex(index);
    }

    public ProductEntity[] getProducts(SearchDto searchDto){
        searchDto.setTotalCount(this.productMapper.selectProductsCountBySearch(searchDto));
        searchDto.setMaxPage(searchDto.getTotalCount() / searchDto.getCountPerPage() + (searchDto.getTotalCount() % searchDto.getCountPerPage() == 0 ? 0 : 1));
        searchDto.setMinPage(1);
        searchDto.setOffset(searchDto.getCountPerPage() * (searchDto.getRequestPage() - 1));
        return this.productMapper.selectProductsBySearch(searchDto);
    }

    public ProductEntity[] getStoreTicket(){
        return this.productMapper.selectProductsFourByTypeTicket();
    }

    public ProductEntity[] getStoreDfg(){
        return this.productMapper.selectProductsFourByTypeDfg();
    }
    public ProductEntity[] getStorePoint(){
        return this.productMapper.selectProductsFourByTypePoint();
    }

    // 인덱스 번호 눌렀을때 페이지 나오게 하기
    public ProductEntity getStoreIndex(@RequestParam("index")int index) {
        return this.productMapper.selectProductByIndex(index);
    }

    public StoreOrderDto getStoreSale(String cardName, int rOrderTotalPrice){
        //최종금액 - 할인된 금액의 값 = rOrderTotalPrice
        StoreOrderDto storeOrderDto = new StoreOrderDto();
        CardEntity salePrice = this.cardMapper.selectCardByName(cardName);

        if (salePrice != null){
            storeOrderDto.setSaleTotalPrice(rOrderTotalPrice- rOrderTotalPrice *  salePrice.getDiscountRate()/100);
            storeOrderDto.setSalePrice(rOrderTotalPrice *  salePrice.getDiscountRate()/100);
        }

        return storeOrderDto;
    }
}
